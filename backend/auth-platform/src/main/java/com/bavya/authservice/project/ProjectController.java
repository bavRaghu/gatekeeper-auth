package com.bavya.authservice.project;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {

    @GetMapping("/api/projects")
    public String projects() {

        return "Protected Projects Endpoint";
    }
}