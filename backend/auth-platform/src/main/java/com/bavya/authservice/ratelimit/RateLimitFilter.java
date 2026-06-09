package com.bavya.authservice.ratelimit;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class RateLimitFilter
        extends OncePerRequestFilter {

    private final RateLimitService rateLimitService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull FilterChain filterChain
    )
            throws ServletException, IOException {

        String apiKey =
                request.getHeader(
                        "X-API-Key"
                );

        if (apiKey != null) {

            boolean allowed =
                    rateLimitService
                            .allowRequest(apiKey);

            if (!allowed) {

                response.setStatus(429);

                response.getWriter()
                        .write(
                                "Rate limit exceeded"
                        );

                return;
            }
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}
