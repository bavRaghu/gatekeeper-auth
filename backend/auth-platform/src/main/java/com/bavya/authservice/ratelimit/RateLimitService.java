package com.bavya.authservice.ratelimit;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RateLimitService {

    private final StringRedisTemplate redisTemplate;

    private static final int LIMIT = 100;

    public boolean allowRequest(
            String apiKey
    ) {

        String redisKey =
                "rate_limit:" + apiKey;

        Long count =
                redisTemplate.opsForValue()
                        .increment(redisKey);

        if (count == 1) {

            redisTemplate.expire(
                    redisKey,
                    Duration.ofMinutes(1)
            );
        }

        return count <= LIMIT;
    }
}