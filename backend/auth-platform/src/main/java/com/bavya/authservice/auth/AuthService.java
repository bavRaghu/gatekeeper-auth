package com.bavya.authservice.auth;

import com.bavya.authservice.jwt.JwtService;
import com.bavya.authservice.tokens.RefreshTokenService;
import com.bavya.authservice.tokens.RefreshTokens;
import com.bavya.authservice.user.User;
import com.bavya.authservice.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public void signup(SignupRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setEmail(request.email());

        user.setPasswordHash(
                passwordEncoder.encode(request.password())
        );

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() ->
                        new RuntimeException("Invalid credentials"));

        boolean matches = passwordEncoder.matches(
                request.password(),
                user.getPasswordHash()
        );

        if (!matches) {
            throw new RuntimeException("Invalid credentials");
        }

        String accessToken =
                jwtService.generateToken(
                        user.getEmail()
                );

        RefreshTokens refreshToken =
                refreshTokenService
                        .createToken(user);

        return new LoginResponse(
                accessToken,
                refreshToken.getToken()
        );
    }

    public MeResponse me() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return new MeResponse(email);
    }

    public LoginResponse refresh(
            RefreshRequest request
    ) {

        RefreshTokens refreshToken =
                refreshTokenService
                        .rotateToken(
                                request.refreshToken()
                        );

        String accessToken =
                jwtService.generateToken(
                        refreshToken
                                .getUser()
                                .getEmail()
                );

        return new LoginResponse(
                accessToken,
                refreshToken.getToken()
        );
    }

    @Transactional
    public void logout(
            LogoutRequest request
    ) {

        refreshTokenService
                .deleteToken(
                        request.refreshToken()
                );
    }
}