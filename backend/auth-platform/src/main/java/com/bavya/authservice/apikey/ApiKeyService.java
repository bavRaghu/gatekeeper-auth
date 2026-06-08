package com.bavya.authservice.apikey;

import com.bavya.authservice.apikey.*;
import com.bavya.authservice.project.*;
import com.bavya.authservice.user.User;
import com.bavya.authservice.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.*;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApiKeyService {

    private final ApiKeyRepository apiKeyRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private String generateKey() {

        return "sk_live_" +
                UUID.randomUUID()
                        .toString()
                        .replace("-", "");
    }

    public ApiKeyResponse createApiKey(
            Long projectId,
            CreateApiKeyRequest request
    ) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User currentUser =
                userRepository
                        .findByEmail(email)
                        .orElseThrow();

        ProjectMember membership =
                projectMemberRepository
                        .findByProjectIdAndUser(
                                projectId,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Not a member of project"
                                )
                        );

        if (membership.getRole() != Role.OWNER) {
            throw new RuntimeException(
                    "Only owners can create API keys"
            );
        }

        Project project =
                projectRepository
                        .findById(projectId)
                        .orElseThrow();

        String rawKey =
                generateKey();

        ApiKey apiKey =
                new ApiKey();

        apiKey.setName(
                request.name()
        );

        apiKey.setProject(
                project
        );

        apiKey.setKeyHash(
                passwordEncoder.encode(rawKey)
        );

        apiKeyRepository.save(apiKey);

        return new ApiKeyResponse(
                apiKey.getId(),
                apiKey.getName(),
                rawKey
        );
    }

    public List<ApiKeySummaryResponse> getApiKeys(
            Long projectId
    ) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User currentUser =
                userRepository
                        .findByEmail(email)
                        .orElseThrow();

        projectMemberRepository
                .findByProjectIdAndUser(
                        projectId,
                        currentUser
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Not a member of project"
                        )
                );

        Project project =
                projectRepository
                        .findById(projectId)
                        .orElseThrow();

        return apiKeyRepository
                .findByProject(project)
                .stream()
                .map(key ->
                        new ApiKeySummaryResponse(
                                key.getId(),
                                key.getName()
                        )
                )
                .toList();
    }
}