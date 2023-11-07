package com.example.praisebackend.auth;

import com.example.praisebackend.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthResponseDTO {

    private String token;
    private Role role;

}
