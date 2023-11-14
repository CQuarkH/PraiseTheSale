package com.example.praisebackend.dtos.users;

import lombok.Data;

@Data
public class ProfileUpdateRequestDTO {
    private String authHeader;
    private String name;
    private String email;
    private String description;
    private String imageLink;
}
