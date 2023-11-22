package com.example.praisebackend.dtos.users;

import lombok.Data;

@Data
public class UserStatusChangeRequestDTO {
    private Long adminId;
    private Long userId;
    private String userEmail;
    private String reason;
    private boolean ban;
}
