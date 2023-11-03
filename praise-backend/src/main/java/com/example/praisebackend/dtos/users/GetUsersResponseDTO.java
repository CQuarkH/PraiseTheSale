package com.example.praisebackend.dtos.users;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetUsersResponseDTO {

    private List<UserResponseDTO> users;

}
