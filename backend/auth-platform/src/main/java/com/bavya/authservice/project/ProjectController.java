package com.bavya.authservice.project;

import com.bavya.authservice.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;

    @GetMapping
    public List<ProjectResponse> getProjects() {
        return projectService.getProjects();
    }

    @PostMapping
    public ProjectResponse createProject(
            @RequestBody CreateProjectRequest request
    ) {
        return projectService.createProject(request);
    }

    @PostMapping("/{projectId}/members")
    public void addMember(
            @PathVariable Long projectId,
            @RequestBody AddMemberRequest request
    ) {
        projectService.addMember(
                projectId,
                request
        );
    }

    @GetMapping("/{projectId}/members")
    public List<MemberResponse> getMembers(
            @PathVariable Long projectId
    ) {
        return projectService.getMembers(
                projectId
        );
    }

    @PatchMapping("/{projectId}/members/{userId}")
    public void updateRole(
            @PathVariable Long projectId,
            @PathVariable User userId,
            @RequestBody UpdateRoleRequest request
    ) {

        projectService.updateRole(
                projectId,
                userId,
                request
        );
    }

    @DeleteMapping("/{projectId}/members/{userId}")
    public void removeMember(
            @PathVariable Long projectId,
            @PathVariable Long userId
    ) {

        projectService.removeMember(
                projectId,
                userId
        );
    }

    @GetMapping("/{projectId}")
    public ProjectDetailsResponse getProject(
            @PathVariable Long projectId,
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(
                                authentication.getName()
                        )
                        .orElseThrow();

        return projectService.getProject(
                projectId,
                user
        );
    }
}