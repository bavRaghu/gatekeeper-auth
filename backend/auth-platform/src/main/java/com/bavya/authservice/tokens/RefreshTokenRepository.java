package com.bavya.authservice.tokens;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository
        extends JpaRepository<RefreshTokens, Long> {

    Optional<RefreshTokens> findByToken(
            String token
    );

    void deleteByToken(
            String token
    );
}