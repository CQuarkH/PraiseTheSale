package com.example.praisebackend.dtos.users;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String description;
    private LocalDateTime creationTime;

}
