package com.bavya.authservice.audit;

import com.bavya.authservice.project.Project;
import com.bavya.authservice.user.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Project project;

    private String action;

    private String details;

    private LocalDateTime createdAt =
            LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Project getProject() {
        return project;
    }

    public String getAction() {
        return action;
    }

    public String getDetails() {
        return details;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}