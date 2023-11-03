package com.example.praisebackend.services;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.mappers.UserMapper;
import com.example.praisebackend.dtos.users.ExtendedUserResponseDTO;
import com.example.praisebackend.dtos.users.GetUsersResponseDTO;
import com.example.praisebackend.dtos.users.UserRequestUpdateDTO;
import com.example.praisebackend.dtos.users.UserResponseDTO;
import com.example.praisebackend.exceptions.UserNotFoundException;
import com.example.praisebackend.models.Role;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final AuditLogService auditLogService;

    private final UserMapper userMapper;

    private final JwtTokenService jwtTokenService;

    public UserResponseDTO getUserByID(Long id, String token) throws Exception {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent() && (jwtTokenService.getUserIDFromHeaderToken(token) == id)) {
            return userMapper.userToUserDTO(userOptional.get());
        } else {
            throw new UserNotFoundException(id);
        }

    }

    public UserResponseDTO updateUser(Long id, UserRequestUpdateDTO userUpdateDTO) throws Exception {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            user.setName(userUpdateDTO.getName());
            user.setEmail(userUpdateDTO.getEmail());
            user.setDescription(userUpdateDTO.getDescription());

            userRepository.save(user);
            return userMapper.userToUserDTO(user);
        } else {
            throw new UserNotFoundException(id);
        }
    }

    public void deleteUser(Long id) throws Exception {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new UserNotFoundException(id);
        }
    }

    public GetUsersResponseDTO weeklyUsers() throws Exception {
        try {
            return GetUsersResponseDTO.builder()
                    .users(
                            userMapper.usersToUserResponseDTOs(
                                    userRepository.findUsersCreatedAfterWithoutRole(LocalDateTime.now().minusDays(7),
                                            Role.ADMIN)))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching weekly users: " + e.getMessage());
        }
    }

    public GetUsersResponseDTO getAllUsers() throws Exception {
        try {
            return GetUsersResponseDTO.builder()
                    .users(userMapper.usersToUserResponseDTOs(
                            userRepository.findUsersWithoutRole(Role.ADMIN)))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching users: " + e.getMessage());
        }
    }

    public GetUsersResponseDTO getUsersByRole(Role role) throws Exception {
        try {
            return GetUsersResponseDTO.builder()
                    .users(userMapper.usersToUserResponseDTOs(
                            userRepository.findUsersByRole(role)))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching users by role (" + role + ") : " + e.getMessage());

        }
    }

    public ExtendedUserResponseDTO getExtendedUser(Long id) throws Exception {
        try {
            return userMapper.userToExtendedUserResponseDTO(
                    userRepository.findById(id).orElse(null), auditLogService.getAuditLogsByUser(id));
        } catch (Exception e) {
            throw new Exception("Error on extended user fetching: " + e.getMessage());
        }
    }

}