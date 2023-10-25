package com.example.praisebackend.dtos.mappers;

import org.mapstruct.Mapper;
import com.example.praisebackend.dtos.UserResponseDTO;
import com.example.praisebackend.models.user.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDTO userToUserDTO(User user);

    User userDTOtoUser(UserResponseDTO userDTO);
}