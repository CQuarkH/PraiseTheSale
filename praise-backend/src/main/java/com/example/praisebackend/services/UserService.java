package com.example.praisebackend.services;

import com.example.praisebackend.dtos.UserResponseDTO;
import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.UserRequestUpdateDTO;
import com.example.praisebackend.dtos.mappers.UserMapper;
import com.example.praisebackend.exceptions.UserNotFoundException;
import com.example.praisebackend.models.user.User;
import com.example.praisebackend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final JwtTokenService jwtTokenService;

    public UserResponseDTO getUserByID(Long id, String token) throws Exception {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent() && (jwtTokenService.getUserIDFromToken(token) == id)) {
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

}