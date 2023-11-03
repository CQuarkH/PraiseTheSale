package com.example.praisebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.praisebackend.models.Role;
import com.example.praisebackend.models.user.User;

import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.creationTime >= :date AND u.role != :role")
    List<User> findUsersCreatedAfterWithoutRole(LocalDateTime localDateTime, @Param("role") Role role);

    @Query("SELECT u FROM User u WHERE u.role != :role")
    List<User> findUsersWithoutRole(@Param("role") Role role);

    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findUsersByRole(@Param("role") Role role);

}
