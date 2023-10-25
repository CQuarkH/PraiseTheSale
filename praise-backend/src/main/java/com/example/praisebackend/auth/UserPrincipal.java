package com.example.praisebackend.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.praisebackend.models.user.User;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private Long id;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private boolean isEnabled;
    private LocalDateTime creationTime;
    private String description;

    public UserPrincipal(User user) {
        this.id = user.getId();
        this.username = user.getEmail();
        this.password = user.getPassword();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
        this.isEnabled = !user.isBanned();
        this.creationTime = user.getCreationTime();
        this.description = user.getDescription();
    }

    public Long getID() {
        return id;
    }

    public LocalDateTime getCreationTime() {
        return this.creationTime;
    }

    public String getDescription() {
        return this.description;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Non implemented yet!
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isEnabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Non implemented yet!
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }

}
