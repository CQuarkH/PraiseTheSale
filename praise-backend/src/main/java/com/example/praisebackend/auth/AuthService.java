package com.example.praisebackend.auth;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.mappers.UserMapper;
import com.example.praisebackend.dtos.users.LoginRequestDTO;
import com.example.praisebackend.dtos.users.RegisterRequestDTO;
import com.example.praisebackend.models.VerificationToken;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.UserRepository;
import com.example.praisebackend.repositories.VerificationTokenRepository;
import com.example.praisebackend.services.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final VerificationTokenRepository verificationTokenRepository;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenService jwtTokenService;

    private final EmailService emailService;

    private final UserMapper userMapper;

    private Map<String, Object> generateTokenClaims(UserPrincipal userPrincipal) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userID", userPrincipal.getID());
        claims.put("role", userPrincipal.getRole());
        return claims;
    }

    private String findUserAndGenerateToken(String email) {
        UserPrincipal userPrincipal = new UserPrincipal(userRepository.findByEmail(email));
        return jwtTokenService.generateToken(generateTokenClaims(userPrincipal), userPrincipal);
    }

    public AuthResponseDTO authenticate(LoginRequestDTO requestDTO) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            requestDTO.getEmail(),
                            requestDTO.getPassword()));

            UserPrincipal userPrincipal = new UserPrincipal(userRepository.findByEmail(requestDTO.getEmail()));
            validateAccountStatus(userPrincipal);

            return AuthResponseDTO
                    .builder()
                    .token(findUserAndGenerateToken(requestDTO.getEmail()))
                    .role(userPrincipal.getRole())
                    .build();
        } catch (Exception e) {
            throw new Exception("Error trying to authenticate: " + e.getMessage());
        }
    }

    public void registerUser(RegisterRequestDTO registerRequestDTO) throws Exception {
        User newUser = userMapper.registerUserDTOtoUser(registerRequestDTO);
        checkIfUserAlreadyExists(newUser);

        newUser.setEnabled(false);
        userRepository.save(newUser);

        sendConfirmationEmail(newUser);

    }

    public void confirmUserAccount(String token) throws Exception {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken != null && !verificationToken.isExpired()) {
            User user = verificationToken.getUser();
            user.setEnabled(true);
            userRepository.save(user);
            verificationTokenRepository.delete(verificationToken);
        } else {
            throw new RuntimeException("Invalid or expired token");
        }
    }

    private void sendConfirmationEmail(User newUser) throws Exception {
        try {
            VerificationToken verificationToken = createVerificationTokenForUser(newUser);
            System.out.println("Token created...");
            emailService.sendConfirmationEmail(newUser.getEmail(), verificationToken.getToken());
        } catch (Exception e) {
            throw new Exception("Error on sending confirmation email: " + e.getMessage());
        }

    }

    private void checkIfUserAlreadyExists(User user) throws Exception {
        if (userAlreadyExists(user)) {
            throw new Exception("User already exists with email: " + user.getEmail());
        }
    }

    private boolean userAlreadyExists(User user) {
        return userRepository.findByEmail(user.getEmail()) != null;
    }

    private VerificationToken createVerificationTokenForUser(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpiryDate(Instant.now().plus(1, ChronoUnit.DAYS));

        verificationTokenRepository.save(verificationToken);
        return verificationToken;
    }

    private void validateAccountStatus(UserPrincipal userPrincipal) throws DisabledException {
        if (!userPrincipal.isEnabled()) {
            throw new DisabledException("Your account is not active. Please check your email to confirm your account.");
        }
    }
}
