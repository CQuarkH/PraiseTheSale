package com.example.praisebackend.services;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.mappers.UserMapper;
import com.example.praisebackend.dtos.sellers.SellerProfileUpdateRequestDTO;
import com.example.praisebackend.dtos.users.ExtendedUserResponseDTO;
import com.example.praisebackend.dtos.users.GetUsersResponseDTO;
import com.example.praisebackend.dtos.users.ProfileUpdateRequestDTO;
import com.example.praisebackend.dtos.users.UserResponseDTO;
import com.example.praisebackend.dtos.users.UserStatusChangeRequestDTO;
import com.example.praisebackend.exceptions.UserNotFoundException;
import com.example.praisebackend.models.Role;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final AuditLogService auditLogService;

    private final UserMapper userMapper;

    private final JwtTokenService jwtTokenService;

    public void updateUserBanStatus(UserStatusChangeRequestDTO banUserRequestDTO) throws Exception {
        try {
            User user = getUserByID(banUserRequestDTO.getUserId());
            user.setBanned(banUserRequestDTO.isBan());
            userRepository.save(user);

            if (banUserRequestDTO.isBan()) {
                auditLogService.logUserBanned(banUserRequestDTO.getAdminId(), banUserRequestDTO.getUserId(),
                        banUserRequestDTO.getReason());
            } else {
                auditLogService.logUserUnbanned(banUserRequestDTO.getAdminId(), banUserRequestDTO.getUserId(),
                        banUserRequestDTO.getReason());
            }

        } catch (UserNotFoundException e) {
            throw new Exception("Error updating user status: " + e.getMessage());
        }
    }

    public UserResponseDTO getUserProfileByHeader(String authHeader) throws Exception {
        Long userID = jwtTokenService.getUserIDFromHeaderToken(authHeader);
        try {

            return userMapper.userToUserDTO(getUserByID(userID));
        } catch (Exception e) {
            throw new UserNotFoundException(userID);

        }

    }

    public UserResponseDTO updateUserProfile(ProfileUpdateRequestDTO userUpdateDTO) throws Exception {
        Long userID = jwtTokenService.getUserIDFromHeaderToken(userUpdateDTO.getAuthHeader());
        String userRole = jwtTokenService.getUserRoleFromHeaderToken(userUpdateDTO.getAuthHeader());
        try {
            User user = getUserByID(userID);
            user.setName(userUpdateDTO.getName());
            user.setDescription(userUpdateDTO.getDescription());
            user.setImageLink(userUpdateDTO.getImageLink());
            userRepository.save(user);

            if (userRole.equals(Role.SELLER.toString()) && userUpdateDTO instanceof SellerProfileUpdateRequestDTO) {
                System.out.println("Updating seller!");
            } else {

            }

            return userMapper.userToUserDTO(user);

        } catch (Exception e) {
            throw new UserNotFoundException(userID);
        }

    }

    public void deleteUser(Long id) throws Exception {
        try {
            User user = getUserByID(id);
            userRepository.delete(user);
        } catch (Exception e) {
            throw new Exception("Error on deleting user account: " + e.getMessage());
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

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User with email " + email + " not found."));
    }

    private User getUserByID(Long userId) throws UserNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

}