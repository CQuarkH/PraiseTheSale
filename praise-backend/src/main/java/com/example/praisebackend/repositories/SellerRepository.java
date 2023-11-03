package com.example.praisebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.praisebackend.models.user.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

}
