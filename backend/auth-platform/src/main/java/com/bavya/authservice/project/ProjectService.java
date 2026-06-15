package com.bavya.authservice.project;

import com.bavya.authservice.apikey.ApiKey;
import com.bavya.authservice.apikey.ApiKeyRepository;
import com.bavya.authservice.apikey.ApiKeySummary;
import com.bavya.authservice.audit.AuditLog;
import com.bavya.authservice.audit.AuditLogRepository;
import com.bavya.authservice.audit.AuditLogService;
import com.bavya.authservice.dashboard.ActivityResponse;
import com.bavya.authservice.user.User;
import com.bavya.authservice.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final AuditLogService auditLogService;
    private final ApiKeyRepository apiKeyRepository;
    private final AuditLogRepository auditLogRepository;

    public ProjectResponse createProject(
            CreateProjectRequest request
    ) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User owner =
                userRepository.findByEmail(email)
                        .orElseThrow();

        Project project = new Project();

        project.setName(request.name());
        project.setOwner(owner);

        projectRepository.save(project);

        ProjectMember membership =
                new ProjectMember();

        membership.setProject(project);
        membership.setUser(owner);
        membership.setRole(Role.OWNER);

        projectMemberRepository.save(membership);

        auditLogService.log(
                owner,
                project,
                "PROJECT_CREATED",
                project.getName()
        );

        return new ProjectResponse(
                project.getId(),
                project.getName()
        );
    }

    public List<ProjectResponse> getProjects() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User owner =
                userRepository.findByEmail(email)
                        .orElseThrow();

        return projectRepository
                .findByOwner(owner)
                .stream()
                .map(project ->
                        new ProjectResponse(
                                project.getId(),
                                project.getName()
                        ))
                .toList();
    }

    private ProjectMember getMembership(
            Long projectId,
            User user
    ) {
        return projectMemberRepository
                .findByProjectIdAndUser(
                        projectId,
                        user
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Not a member of project"
                        )
                );
    }

    private void requireOwner(
            Long projectId,
            User user
    ) {

        ProjectMember membership =
                getMembership(
                        projectId,
                        user
                );

        if (membership.getRole()
                != Role.OWNER) {

            throw new RuntimeException(
                    "Only owners can perform this action"
            );
        }
    }

    public void addMember(
            Long projectId,
            AddMemberRequest request
    ) {
        System.out.println("ADD MEMBER ENDPOINT HIT");

        String currentEmail =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User currentUser =
                userRepository
                        .findByEmail(currentEmail)
                        .orElseThrow();

        requireOwner(
                projectId,
                currentUser
        );

        User targetUser =
                userRepository
                        .findByEmail(request.email())
                        .orElseThrow();

        if (
                projectMemberRepository
                        .existsByProjectIdAndUser(
                                projectId,
                                targetUser
                        )
        ) {
            throw new RuntimeException(
                    "Already a member"
            );
        }

        Project project =
                projectRepository
                        .findById(projectId)
                        .orElseThrow();

        ProjectMember membership =
                new ProjectMember();

        membership.setUser(targetUser);
        membership.setProject(project);
        membership.setRole(request.role());

        projectMemberRepository
                .save(membership);

        auditLogService.log(
                currentUser,
                project,
                "MEMBER_ADDED",
                targetUser.getEmail()
        );
    }

    public List<MemberResponse> getMembers(
            Long projectId
    ) {
        System.out.println("GET MEMBERS HIT");

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User currentUser =
                userRepository
                        .findByEmail(email)
                        .orElseThrow();

        getMembership(
                projectId,
                currentUser
        );

        return projectMemberRepository
                .findByProjectId(projectId)
                .stream()
                .map(member ->
                        new MemberResponse(
                                member.getUser().getId(),
                                member.getUser().getEmail(),
                                member.getRole()
                        )
                )
                .toList();
    }

    public void updateRole(
            Long projectId,
            User userId,
            UpdateRoleRequest request
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

        requireOwner(
                projectId,
                currentUser
        );

        ProjectMember member =
                projectMemberRepository
                        .findByProjectIdAndUser(
                                projectId,
                                userId
                        )
                        .orElseThrow();

        member.setRole(
                request.role()
        );

        Project project =
                projectRepository
                        .findById(projectId)
                        .orElseThrow();

        projectMemberRepository
                .save(member);

        auditLogService.log(
                currentUser,
                project,
                "ROLE_UPDATED",
                request.role().name()
        );
    }

    public void removeMember(
            Long projectId,
            Long userId
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

        requireOwner(
                projectId,
                currentUser
        );

        User targetUser =
                userRepository
                        .findById(userId)
                        .orElseThrow();

        ProjectMember member =
                projectMemberRepository
                        .findByProjectIdAndUser(
                                projectId,
                                targetUser
                        )
                        .orElseThrow();

        if (member.getRole() == Role.OWNER) {
            throw new RuntimeException(
                    "Cannot remove owner"
            );
        }

        Project project =
                projectRepository
                        .findById(projectId)
                        .orElseThrow();

        projectMemberRepository.delete(member);

        auditLogService.log(
                currentUser,
                project,
                "MEMBER_REMOVED",
                targetUser.getEmail()
        );
    }

    public ProjectDetailsResponse getProject(
            Long projectId,
            User user
    ) {

        ProjectMember currentUser =
                projectMemberRepository
                        .findByProjectIdAndUser(
                                projectId,
                                user
                        )
                        .orElseThrow();

        Project project =
                currentUser.getProject();

        List<ProjectMember> members =
                projectMemberRepository
                        .findByProjectId(projectId);

        List<ApiKey> apiKeys =
                apiKeyRepository
                        .findByProjectId(projectId);

        List<AuditLog> logs =
                auditLogRepository
                        .findTop10ByProjectIdOrderByCreatedAtDesc(
                                projectId
                        );

        String ownerEmail =
                members.stream()
                        .filter(member ->
                                member.getRole()
                                        .name()
                                        .equals("OWNER"))
                        .findFirst()
                        .map(member ->
                                member.getUser()
                                        .getEmail())
                        .orElse("Unknown");

        List<ProjectMemberSummary>
                memberResponses =
                members.stream()
                        .map(member ->
                                new ProjectMemberSummary(
                                        member.getUser()
                                                .getId(),
                                        member.getUser()
                                                .getEmail(),
                                        member.getRole()
                                                .name()
                                ))
                        .toList();

        List<ApiKeySummary>
                apiKeyResponses =
                apiKeys.stream()
                        .map(apiKey ->
                                new ApiKeySummary(
                                        apiKey.getId(),
                                        apiKey.getName()
                                ))
                        .toList();

        List<ActivityResponse>
                activities =
                logs.stream()
                        .map(log ->
                                new ActivityResponse(
                                        log.getAction(),
                                        log.getDetails(),
                                        log.getCreatedAt()
                                ))
                        .toList();

        return new ProjectDetailsResponse(
                project.getId(),
                project.getName(),
                ownerEmail,
                memberResponses,
                apiKeyResponses,
                activities
        );
    }
}