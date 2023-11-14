package com.example.praisebackend.services;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.example.praisebackend.models.PasswordResetToken;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.PasswordResetTokenRepository;
import com.example.praisebackend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

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
        try {
            PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
            validateToken(passwordResetToken);

            User user = passwordResetToken.getUser();
            user.setPassword(newPassword);
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
            throw new Exception("Token not provided.");
        }

        if (resetToken.getExpiryDate().before(new Date())) {
            throw new Exception("Token has expired.");
        }
    }

}