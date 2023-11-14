package com.example.praisebackend.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.praisebackend.auth.jwt.JwtRequestFilter;
import org.springframework.security.authentication.AuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtRequestFilter jwtRequestFilter;

        private final AuthenticationProvider authenticationProvider;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http.cors(Customizer.withDefaults())
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(
                                                auth -> auth.requestMatchers(SecurityConstants.PUBLIC_URLS).permitAll()
                                                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                                                .requestMatchers(SecurityConstants.ADMIN_URLS)
                                                                .hasRole(SecurityConstants.ADMIN_ROLE)
                                                                .requestMatchers(SecurityConstants.SELLER_URLS)
                                                                .hasRole(SecurityConstants.SELLER_ROLE)
                                                                .requestMatchers(SecurityConstants.BUYER_URLS)
                                                                .hasRole(SecurityConstants.BUYER_ROLE)
                                                                .requestMatchers(SecurityConstants.COMMON_URLS)
                                                                .authenticated())
                                .sessionManagement(
                                                management -> management
                                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }
}
