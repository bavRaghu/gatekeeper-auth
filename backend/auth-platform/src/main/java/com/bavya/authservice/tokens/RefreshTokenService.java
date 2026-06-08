package com.bavya.authservice.tokens;

import com.bavya.authservice.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public RefreshTokens verifyToken(
            String token
    ) {

        RefreshTokens refreshToken =
                refreshTokenRepository
                        .findByToken(token)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Refresh token not found"
                                )
                        );

        if (
                refreshToken.getExpiresAt()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

            refreshTokenRepository
                    .delete(refreshToken);

            throw new RuntimeException(
                    "Refresh token expired"
            );
        }

        return refreshToken;
    }

    public void deleteToken(
            String token
    ) {

        refreshTokenRepository
                .deleteByToken(token);
    }

    @Transactional
    public RefreshTokens rotateToken(
            String token
    ) {

        RefreshTokens oldToken =
                verifyToken(token);

        refreshTokenRepository
                .delete(oldToken);

        return createToken(
                oldToken.getUser()
        );
    }
}