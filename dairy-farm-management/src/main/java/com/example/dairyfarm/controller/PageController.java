//NOT USED NOW
package com.example.dairyfarm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/animals/add")
    public String showAddAnimalForm() {
        return "redirect:/add-animal.html";  // This loads static HTML
    }
}
