package com.example.praisebackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetMail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset Request");
        message.setText(
                "Click the following link to reset your password: http://yourfrontendurl.com/resetPassword?token="
                        + token);
        mailSender.send(message);
    }

    public void sendConfirmationEmail(String toEmail, String token) throws Exception {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Account Confirmation");
            message.setText(
                    "Thank you for registering. Please click the following link to activate your account: "
                            + "http://localhost:3000/confirm-account?token="
                            + token);
            mailSender.send(message);
        } catch (Exception e) {
            throw new Exception("Error on sending confirmation email by JavaMailSender: " + e.getLocalizedMessage()
                    + e.getMessage() + e.getCause());
        }
    }
}