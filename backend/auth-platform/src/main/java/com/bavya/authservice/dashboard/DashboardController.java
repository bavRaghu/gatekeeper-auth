package com.bavya.authservice.dashboard;

import com.bavya.authservice.user.User;
import com.bavya.authservice.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    @GetMapping("/api/dashboard")
    public DashboardResponse dashboard(
            Authentication authentication
    ) {

        User user =
                userRepository
                        .findByEmail(
                                authentication.getName()
                        )
                        .orElseThrow();

        return dashboardService
                .getDashboard(user);
    }
}