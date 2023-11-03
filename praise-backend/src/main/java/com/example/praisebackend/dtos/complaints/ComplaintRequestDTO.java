package com.example.praisebackend.dtos.complaints;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ComplaintRequestDTO {
    private String context;
    private String subject;
    private LocalDateTime dateTime;
    private Long productID;
    private Long userID;
    private Long targetUserID;

}
