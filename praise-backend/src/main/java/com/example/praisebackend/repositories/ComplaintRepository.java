package com.example.praisebackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.praisebackend.models.complaint.Complaint;
import com.example.praisebackend.models.complaint.ComplaintStatus;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUserId(Long userId);

    List<Complaint> findByStatus(ComplaintStatus status);

    @Query("SELECT c FROM Complaint c WHERE c.status != :status")
    List<Complaint> findAllExceptStatus(@Param("status") ComplaintStatus status);

}
