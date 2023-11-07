package com.example.praisebackend.dtos.users;

import lombok.Data;

@Data
public class UnbanUserRequestDTO {
    private Long adminId;
    private Long userId;
    private String reason;
}
