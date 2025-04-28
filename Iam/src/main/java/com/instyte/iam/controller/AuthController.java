package com.instyte.iam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        try {

            String email = body.get("email");
            String password = body.get("password");

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

            if (authentication.isAuthenticated()) {
                return Map.of("message", "Login successful!");
            } else {
                throw new RuntimeException("Invalid credentials");
            }
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid credentials", e);
        }
    }
}