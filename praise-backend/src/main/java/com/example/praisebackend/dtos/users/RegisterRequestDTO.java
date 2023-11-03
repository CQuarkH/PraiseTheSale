package com.example.praisebackend.dtos.users;

import java.time.LocalDateTime;

import com.example.praisebackend.models.Role;

import lombok.Data;

@Data
public class RegisterRequestDTO {

    private String name;
    private String email;
    private String password;
    private Role role;
    private LocalDateTime creationTime;

}
