package com.example.praisebackend.dtos.mappers;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncoderMapper {

    private final BCryptPasswordEncoder passwordEncoder;

    public PasswordEncoderMapper(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String encode(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
