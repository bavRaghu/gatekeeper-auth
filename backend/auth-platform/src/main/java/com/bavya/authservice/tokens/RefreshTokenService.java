package com.bavya.authservice.tokens;

import com.bavya.authservice.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository
            refreshTokenRepository;

    public RefreshTokens createToken(
            User user
    ) {

        RefreshTokens token =
                new RefreshTokens();

        token.setToken(
                UUID.randomUUID().toString()
        );

        token.setUser(user);

        token.setExpiresAt(
                LocalDateTime.now()
                        .plusDays(30)
        );

        return refreshTokenRepository
                .save(token);
    }
}