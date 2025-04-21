// VetVisitController.java
package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.VetVisit;
import com.example.dairyfarm.repository.VetVisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // Allow CORS for frontend dev
@RestController
@RequestMapping("/api/vet-visits")
public class VetVisitController {

    @Autowired
    private VetVisitRepository vetVisitRepository;

    @GetMapping
    public List<VetVisit> getAllVisits() {
        return vetVisitRepository.findAll();
    }

    @PostMapping
    public VetVisit addVisit(@RequestBody VetVisit visit) {
        System.out.println(visit);
        return vetVisitRepository.save(visit);
    }
}
