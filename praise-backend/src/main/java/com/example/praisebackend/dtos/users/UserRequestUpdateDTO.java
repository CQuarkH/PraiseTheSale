package com.example.praisebackend.dtos.users;

import lombok.Data;

@Data
public class UserRequestUpdateDTO {
    private String name;
    private String email;
    private String description;

}
