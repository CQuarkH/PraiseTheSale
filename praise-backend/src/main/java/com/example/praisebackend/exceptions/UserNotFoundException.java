package com.example.praisebackend.exceptions;

public class UserNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UserNotFoundException(Long id) {
        super("User with ID " + id + " not found.");
    }

}