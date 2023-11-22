package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.models.tokens.RateSellerToken;
import com.example.praisebackend.models.user.Seller;
import com.example.praisebackend.repositories.SellerRepository;
import com.example.praisebackend.repositories.tokens.RateSellerTokenRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RateSellerService {

    private final RateSellerTokenRepository rateSellerTokenRepository;
    private final EmailService emailService;
    private final SellerRepository sellerRepository;

    public void createAndSendRatingToken(Long buyerId, String buyerEmail, Long sellerId, Long productId)
            throws Exception {
        try {
            String token = UUID.randomUUID().toString();
            RateSellerToken rateSellerToken = new RateSellerToken(buyerId, sellerId, productId, token, false);
            rateSellerTokenRepository.save(rateSellerToken);
            emailService.sendRatingEmail(buyerEmail, sellerId, productId, token);
        } catch (Exception e) {
            throw new Exception("Error sending rating email: " + e.getMessage());
        }
    }

    @Transactional
    public void rateSeller(String token, double rating) throws Exception {

        RateSellerToken rateSellerToken = isValidToken(token);
        Long sellerId = rateSellerToken.getSellerId();

        updateSellerRating(sellerId, rating);

        rateSellerToken.setUsed(true);
        rateSellerTokenRepository.save(rateSellerToken);
    }

    public RateSellerToken isValidToken(String token) throws Exception {
        return rateSellerTokenRepository.findByTokenAndUsedIsFalse(token)
                .orElseThrow(() -> new Exception("Invalid or already used token!"));

    }

    public void updateSellerRating(Long sellerId, double newRating) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new EntityNotFoundException("Seller not found"));

        seller.addRating(newRating);

        sellerRepository.save(seller);
    }

}
