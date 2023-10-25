package com.example.praisebackend.dtos;

import com.example.praisebackend.models.Role;

import lombok.Data;

@Data
public class RegisterRequestDTO {

    private String name;
    private String email;
    private String password;
    private Role role;

}
