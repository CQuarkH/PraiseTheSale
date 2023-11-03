package com.example.praisebackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.praisebackend.models.user.SalesHistory;

@Repository
public interface SalesHistoryRepository extends JpaRepository<SalesHistory, Long> {
    List<SalesHistory> findBySellerId(Long sellerId);
}
