package com.bavya.authservice.project;

import com.bavya.authservice.user.User;
import com.bavya.authservice.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

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

        return new ProjectResponse(
                project.getId(),
                project.getName()
        );
    }
}