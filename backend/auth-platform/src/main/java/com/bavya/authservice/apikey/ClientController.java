package com.bavya.authservice.apikey;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @GetMapping("/test")
    public String test(
            HttpServletRequest request
    ) {

        Object project =
                request.getAttribute(
                        "project"
                );

        if (project == null) {

            return "No API Key";
        }

        return "API Key Valid";
    }
}