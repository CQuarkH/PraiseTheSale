package com.example.praisebackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.praisebackend.models.product.Product;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetMail(String toEmail, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request");

        String body = "Click the following link to reset your password: "
                + "<a href='http://localhost:3000/reset-password?token=" + token + "'>Reset Password</a>";
        helper.setText(buildEmailContent("Password Reset Request", body, "#6B77AE"), true);

        mailSender.send(message);
    }

    public void sendRatingEmail(String toEmail, Long sellerId, Long productId, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("Product Rating Request");

        String ratingUrl = "http://localhost:3000/rateSeller?sellerId=" + sellerId + "&productId=" + productId
                + "&token=" + token;
        String body = "Thank you for your purchase! Please rate the seller using the following link: "
                + "<a href='" + ratingUrl + "'>Rate Seller</a>";
        helper.setText(buildEmailContent("Product Rating Request", body, "#6B77AE"), true);

        mailSender.send(message);
    }

    public void sendConfirmationEmail(String toEmail, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("Account Confirmation");

        String body = "Thank you for registering. Please click the following link to activate your account: "
                + "<a href='http://localhost:3000/confirm-account?token=" + token + "'>Activate Account</a>";
        helper.setText(buildEmailContent("Account Confirmation", body, "#6B77AE"), true);

        mailSender.send(message);
    }

    public void sendProductSuspensionEmail(String toEmail, Product product, String reason) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("Product Suspension Notification");

        String content = buildProductSuspendContent(product, reason);
        helper.setText(content, true);

        mailSender.send(message);
    }

    private String buildEmailContent(String title, String body, String color) {
        return "<div style='background-color: #1B1F31; color: white; padding: 20px; border-radius: 10px;'>"
                + "<h1 style='color: " + color + ";'>" + title + "</h1>"
                + "<p>" + body + "</p>"
                + "</div>";
    }

    private String buildProductSuspendContent(Product product, String reason) {
        String emailContent = "<div style='background-color: #1B1F31; color: white; padding: 20px; border-radius: 10px;'>"
                + "<h1 style='color: #6B77AE;'>Product Suspension Notification</h1>"
                + "<p>The following product has been suspended:</p>"
                + "<div style='background-color: #2A304C; padding: 10px; border-radius: 10px;'>"
                + "<p><b>Name:</b> " + product.getName() + "</p>"
                + "<p><b>Description:</b> " + product.getDescription() + "</p>"
                + "<p><b>Price:</b> " + product.getPrice() + "</p>"
                + "<p><b>ID:</b> " + product.getId() + "</p>"
                + "<p><b>Reason for Suspension:</b> " + reason + "</p>"
                + "</div>";

        if (product.getImageLink() != null) {
            emailContent += "<img src='" + product.getImageLink()
                    + "' alt='Product Image' style='max-width: 100%; border-radius: 10px; padding: 10px 0;' />";
        }

        emailContent += "</div>";
        return emailContent;
    }

    public void sendProductReactivationEmail(String toEmail, Product product, String reason) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("Product Reactivation Notification");

        String content = buildProductReactivationContent(product, reason);
        helper.setText(content, true);

        mailSender.send(message);
    }

    private String buildProductReactivationContent(Product product, String reason) {
        String emailContent = "<div style='background-color: #1B1F31; color: white; padding: 20px; border-radius: 10px;'>"
                + "<h1 style='color: #6B77AE;'>Product Reactivation Notification</h1>"
                + "<p>The following product has been reactivated:</p>"
                + "<div style='background-color: #2A304C; padding: 10px; border-radius: 10px;'>"
                + "<p><b>Name:</b> " + product.getName() + "</p>"
                + "<p><b>Description:</b> " + product.getDescription() + "</p>"
                + "<p><b>Price:</b> " + product.getPrice() + "</p>"
                + "<p><b>ID:</b> " + product.getId() + "</p>"
                + "<p><b>Reason for Reactivation:</b> " + reason + "</p>"
                + "</div>";

        if (product.getImageLink() != null) {
            emailContent += "<img src='" + product.getImageLink()
                    + "' alt='Product Image' style='max-width: 100%; border-radius: 10px; padding: 10px 0;' />";
        }

        emailContent += "</div>";
        return emailContent;
    }

    public void sendUserStatusChangeEmail(String toEmail, Long userId, String reason, boolean isBan)
            throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String subject, actionNotification, color, actionVerb;
        if (isBan) {
            subject = "Your Account Has Been Banned";
            actionNotification = "has been banned from";
            color = "#FF4C4C";
            actionVerb = "Reason for Ban:";
        } else {
            subject = "Your Account Has Been Unbanned";
            actionNotification = "has been unbanned and is now active again on";
            color = "#98FF98";
            actionVerb = "Reason for Unban:";
        }

        helper.setTo(toEmail);
        helper.setSubject(subject);

        String content = "<div style='background-color: #1B1F31; color: white; padding: 20px; border-radius: 10px;'>"
                + "<h1 style='color: " + color + ";'>" + subject + "</h1>"
                + "<p>We are informing you that your account, with the ID: <b>" + userId
                + "</b>, " + actionNotification + " our platform.</p>"
                + "<p><b>" + actionVerb + "</b> " + reason + "</p>"
                + "<p>If you have any questions or require further assistance, please do not hesitate to contact our support team.</p>"
                + "</div>";

        helper.setText(content, true);

        mailSender.send(message);
    }

}