package com.bavya.authservice.config;

import com.bavya.authservice.apikey.ApiKeyAuthenticationFilter;
import com.bavya.authservice.jwt.JwtAuthenticationFilter;
import com.bavya.authservice.ratelimit.RateLimitFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ApiKeyAuthenticationFilter apiKeyAuthenticationFilter;
    private final RateLimitFilter rateLimitFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, ApiKeyAuthenticationFilter apiKeyAuthenticationFilter, RateLimitFilter rateLimitFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.apiKeyAuthenticationFilter = apiKeyAuthenticationFilter;
        this.rateLimitFilter = rateLimitFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                            "/api/auth/signup",
                            "/api/auth/login",
                            "/api/auth/refresh",
                            "/api/auth/logout",
                            "/api/health",
                            "/api/client/**",
                            "/oauth2/**",
                            "/login/**",
                            "/api/audit-logs"
                    )
                    .permitAll()
                    .anyRequest()
                    .authenticated()
            ).oauth2Login(oauth -> oauth
                    .defaultSuccessUrl(
                            "/api/health",
                            true
                    )
            );

        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        http.addFilterBefore(
                apiKeyAuthenticationFilter,
                JwtAuthenticationFilter.class
        );

        http.addFilterBefore(
                rateLimitFilter,
                ApiKeyAuthenticationFilter.class
        );

        return http.build();
    }
}