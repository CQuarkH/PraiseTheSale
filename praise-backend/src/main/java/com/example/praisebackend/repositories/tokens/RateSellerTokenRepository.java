package com.example.praisebackend.repositories.tokens;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.example.praisebackend.models.tokens.RateSellerToken;

@Repository
public interface RateSellerTokenRepository extends JpaRepository<RateSellerToken, Long> {

    Optional<RateSellerToken> findByTokenAndUsedIsFalse(String token);

}