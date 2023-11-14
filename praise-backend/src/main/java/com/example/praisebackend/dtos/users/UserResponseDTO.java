package com.example.praisebackend.dtos.users;

import java.time.LocalDateTime;

import com.example.praisebackend.models.Role;

import lombok.Data;

@Data
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String description;
    private LocalDateTime creationTime;
    private Role role;
    private String imageLink;

}
