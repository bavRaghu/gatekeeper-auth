package com.bavya.authservice.apikey;

import com.bavya.authservice.project.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiKeyRepository
        extends JpaRepository<ApiKey, Long> {

    List<ApiKey> findByProject(
            Project project
    );
}