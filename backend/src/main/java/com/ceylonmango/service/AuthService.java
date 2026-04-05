package com.ceylonmango.service;

import com.ceylonmango.dto.*;
import com.ceylonmango.model.User;
import com.ceylonmango.repository.UserRepository;
import com.ceylonmango.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final EmailService emailService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already taken");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.USER)
                .build();

        userRepository.save(user);

        String token = tokenProvider.generateTokenFromEmail(user.getEmail());
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());

        try {
            emailService.sendVerificationEmail(user.getEmail(), user.getName(), "http://localhost:5173/verify");
        } catch (Exception e) {
            log.error("Failed to send verification email: {}", e.getMessage());
        }

        return new AuthResponse(token, refreshToken, UserDto.fromEntity(user));
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());
        return new AuthResponse(token, refreshToken, UserDto.fromEntity(user));
    }

    public AuthResponse adminLogin(AuthRequest request) {
        AuthResponse response = login(request);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Access denied: Admin privileges required");
        }

        return response;
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        if (tokenProvider.validateToken(refreshToken)) {
            String email = tokenProvider.getEmailFromToken(refreshToken);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            String newToken = tokenProvider.generateTokenFromEmail(email);
            String newRefreshToken = tokenProvider.generateRefreshToken(email);
            
            return new AuthResponse(newToken, newRefreshToken, UserDto.fromEntity(user));
        }
        throw new RuntimeException("Invalid refresh token");
    }

    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDto updateProfile(UpdateProfileRequest request) {
        User user = getCurrentUser();
        if (request.getName() != null) user.setName(request.getName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAddress() != null) user.setAddress(request.getAddress());
        userRepository.save(user);
        return UserDto.fromEntity(user);
    }
}
