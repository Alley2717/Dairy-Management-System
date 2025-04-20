// FarmController.java - dummy content for now
package com.example.dairyfarm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FarmController {

    @GetMapping("/")
    public String homePage() {
        return "Welcome to the Dairy Farm Management System!";
    }
}
