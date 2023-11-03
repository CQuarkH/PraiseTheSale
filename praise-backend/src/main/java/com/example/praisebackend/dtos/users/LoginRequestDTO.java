package com.example.praisebackend.dtos.users;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;

}
