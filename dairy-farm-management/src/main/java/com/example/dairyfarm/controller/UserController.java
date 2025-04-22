package com.your.project.controller;

import com.your.project.model.User;
import com.your.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
public class UserController {
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }
    
    @PostMapping("/login")
    public String login(@RequestParam String username, 
                        @RequestParam String password, 
                        HttpSession session, 
                        Model model) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        
        if (user == null) {
            model.addAttribute("error", "Invalid login");
            return "login";
        }
        
        session.setAttribute("user", user);
        
        if ("FARMER".equals(user.getRole())) {
            return "redirect:/farmer";
        } else if ("VET".equals(user.getRole())) {
            return "redirect:/vet";
        } else {
            return "redirect:/worker";
        }
    }
    
    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }
    
    @PostMapping("/register")
    public String register(@RequestParam String username, 
                           @RequestParam String password, 
                           @RequestParam String role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);
        
        userRepository.save(user);
        return "redirect:/login";
    }
    
    @GetMapping("/farmer")
    public String farmerDashboard(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || !"FARMER".equals(user.getRole())) {
            return "redirect:/login";
        }
        return "farmer";
    }
    
    @GetMapping("/vet")
    public String vetDashboard(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || !"VET".equals(user.getRole())) {
            return "redirect:/login";
        }
        return "vet";
    }
    
    @GetMapping("/worker")
    public String workerDashboard(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || !"WORKER".equals(user.getRole())) {
            return "redirect:/login";
        }
        return "worker";
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}