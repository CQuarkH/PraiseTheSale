package com.example.praisebackend.dtos.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.stream.Collectors;

import com.example.praisebackend.dtos.auditlogs.GetAuditLogsResponseDTO;
import com.example.praisebackend.dtos.users.ExtendedUserResponseDTO;
import com.example.praisebackend.dtos.users.RegisterRequestDTO;
import com.example.praisebackend.dtos.users.UserResponseDTO;
import com.example.praisebackend.models.user.Buyer;
import com.example.praisebackend.models.user.Seller;
import com.example.praisebackend.models.user.Admin;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    @Autowired
    PasswordEncoderMapper passwordEncoderMapper;

    @Autowired
    UserRepository userRepository;

    public abstract UserResponseDTO userToUserDTO(User user);

    public ExtendedUserResponseDTO userToExtendedUserResponseDTO(User user,
            GetAuditLogsResponseDTO getAuditLogsResponseDTO) {
        ExtendedUserResponseDTO extendedUserResponseDTO = new ExtendedUserResponseDTO();
        extendedUserResponseDTO.setId(user.getId());
        extendedUserResponseDTO.setBanned(user.isBanned());
        extendedUserResponseDTO.setCreationTime(user.getCreationTime());
        extendedUserResponseDTO.setRole(user.getRole());
        extendedUserResponseDTO.setEmail(user.getEmail());
        extendedUserResponseDTO.setDescription(user.getDescription());
        extendedUserResponseDTO.setName(user.getName());
        extendedUserResponseDTO.setAuditLogs(getAuditLogsResponseDTO);

        return extendedUserResponseDTO;
    }

    // public abstract User userDTOtoUser(UserResponseDTO userDTO);

    public User registerUserDTOtoUser(RegisterRequestDTO registerRequestDTO) {
        User user;
        switch (registerRequestDTO.getRole()) {
            case SELLER:
                user = new Seller();
                break;
            case BUYER:
                user = new Buyer();
                break;
            case ADMIN:
                user = new Admin();
                break;
            default:
                throw new IllegalArgumentException("Unknown role: " + registerRequestDTO.getRole());
        }
        mapCommonProperties(user, registerRequestDTO);
        return user;
    }

    private void mapCommonProperties(User user, RegisterRequestDTO registerRequestDTO) {
        user.setName(registerRequestDTO.getName());
        user.setEmail(registerRequestDTO.getEmail());
        user.setPassword(encodePassword(registerRequestDTO.getPassword()));
        user.setRole(registerRequestDTO.getRole());
    }

    @Named("encodePassword")
    protected String encodePassword(String rawPassword) {
        return passwordEncoderMapper.encode(rawPassword);
    }

    public List<UserResponseDTO> usersToUserResponseDTOs(List<User> users) {
        return users.stream().map(this::userToUserDTO).collect(Collectors.toList());
    }

    protected User idToUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("No user found with id " + userId));
    }
}