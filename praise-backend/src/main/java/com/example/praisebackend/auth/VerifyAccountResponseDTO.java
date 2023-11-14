package com.example.praisebackend.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VerifyAccountResponseDTO {
    private String verificationToken;
}
