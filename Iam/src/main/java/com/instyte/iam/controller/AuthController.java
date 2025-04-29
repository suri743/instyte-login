package com.instyte.iam.controller;

import com.instyte.iam.entity.PageInfo;
import com.instyte.iam.repository.PageInfoRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final PageInfoRepository pageInfoRepository;

    @PostMapping("/token")
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

    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> getSiteInfo(HttpServletRequest request) {
        String hostname = request.getServerName();
        log.info("hostname: {}", hostname);

        PageInfo pageInfo = pageInfoRepository.findByHostName(hostname);
        Map<String, String> response = new HashMap<>();

        if (pageInfo != null) {
            response.put("title", pageInfo.getTitle());
            response.put("logoUrl", pageInfo.getImgUrl());
        } else {
            // Default values if no record found
            response.put("title", "Instyte");
            response.put("logoUrl", "/assets/logo.png");
        }

        return ResponseEntity.ok(response);
    }
}