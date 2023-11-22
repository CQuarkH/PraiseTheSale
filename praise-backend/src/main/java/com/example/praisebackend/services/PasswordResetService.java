package com.example.praisebackend.services;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.ResetPasswordRequestDTO;
import com.example.praisebackend.dtos.mappers.PasswordEncoderMapper;
import com.example.praisebackend.exceptions.UserNotFoundException;
import com.example.praisebackend.models.tokens.PasswordResetToken;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.UserRepository;
import com.example.praisebackend.repositories.tokens.PasswordResetTokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoderMapper passwordEncoderMapper;

    public void requestPasswordRecovery(String email) throws Exception {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
        String token = generateToken();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusDays(1));

        passwordResetTokenRepository.save(passwordResetToken);
        emailService.sendPasswordResetMail(email, token);

    }

    public void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDTO) throws Exception {
        try {
            PasswordResetToken passwordResetToken = passwordResetTokenRepository
                    .findByToken(resetPasswordRequestDTO.getToken());
            validateToken(passwordResetToken);

            User user = passwordResetToken.getUser();
            user.setPassword(passwordEncoderMapper.encode(resetPasswordRequestDTO.getNewPassword()));
            userRepository.save(user);

            passwordResetTokenRepository.delete(passwordResetToken);
        } catch (Exception e) {
            throw new Exception("Error on reseting password: " + e.getMessage());
        }

    }

    private String generateToken() {
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);

    }

    private void validateToken(PasswordResetToken resetToken) throws Exception {
        if (resetToken == null) {
            throw new Exception("Token invalid or not provided.");
        }

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new Exception("Token has expired.");
        }
    }

}