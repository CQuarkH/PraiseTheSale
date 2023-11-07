package com.example.praisebackend.auth;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.mappers.UserMapper;
import com.example.praisebackend.dtos.users.LoginRequestDTO;
import com.example.praisebackend.dtos.users.RegisterRequestDTO;
import com.example.praisebackend.models.PasswordResetToken;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.PasswordResetTokenRepository;
import com.example.praisebackend.repositories.UserRepository;
import com.example.praisebackend.services.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final EmailService emailService;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenService jwtTokenService;

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

            return AuthResponseDTO
                    .builder()
                    .token(findUserAndGenerateToken(requestDTO.getEmail()))
                    .role(userPrincipal.getRole())
                    .build();
        } catch (Exception e) {
            throw new Exception("Error trying to authenticate: " + e.getMessage());
        }
    }

    public AuthResponseDTO registerUser(RegisterRequestDTO registerRequestDTO) throws Exception {
        User newUser = userMapper.registerUserDTOtoUser(registerRequestDTO);
        checkIfUserAlreadyExists(newUser);
        userRepository.save(newUser);
        UserPrincipal userPrincipal = new UserPrincipal(newUser);

        return AuthResponseDTO.builder().token(
                jwtTokenService.generateToken(generateTokenClaims(userPrincipal), userPrincipal))
                .role(userPrincipal.getRole())
                .build();
    }

    public void checkIfUserAlreadyExists(User user) throws Exception {
        if (userAlreadyExists(user)) {
            throw new Exception("User already exists with email: " + user.getEmail());
        }
    }

    private boolean userAlreadyExists(User user) {
        return userRepository.findByEmail(user.getEmail()) != null;
    }

    // create separated and dedicated service for reset password handling!!!

    public void requestPasswordRecovery(String email) throws Exception {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        User user = userRepository.findByEmail(email);
        if (user != null) {
            emailService.sendPasswordResetMail(email, generateToken());

        } else {

            throw new Exception("Email not found");
        }

    }

    public void resetPassword(String token, String newPassword) throws Exception {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (isValidToken(resetToken)) {
            User user = resetToken.getUser();
            user.setPassword(newPassword);

            userRepository.save(user);
            resetToken.setUsed(true);
            passwordResetTokenRepository.save(resetToken);
        } else {
            throw new Exception("Invalid Token");
        }

    }

    private String generateToken() {
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }

    private boolean isValidToken(PasswordResetToken resetToken) {
        if (resetToken == null || resetToken.isUsed() || resetToken.getExpiryDate().before(new Date())) {
            return false;
        }
        return true;
    }

}
