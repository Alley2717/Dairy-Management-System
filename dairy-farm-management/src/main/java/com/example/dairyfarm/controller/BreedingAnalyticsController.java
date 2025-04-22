package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.BreedingAnalytics;
import com.example.dairyfarm.repository.BreedingAnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/breeding-analytics")
public class BreedingAnalyticsController {

    @Autowired
    private BreedingAnalyticsRepository breedingAnalyticsRepository;

    @GetMapping
    public List<BreedingAnalytics> getAllBreedingAnalytics() {
        return breedingAnalyticsRepository.findAll();
    }

    @GetMapping("/{id}")
    public BreedingAnalytics getBreedingAnalyticsById(@PathVariable Long id) {
        return breedingAnalyticsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Breeding analytics not found with id: " + id));
    }

    @PostMapping
    public BreedingAnalytics addBreedingAnalytics(@RequestBody BreedingAnalytics breedingAnalytics) {
        return breedingAnalyticsRepository.save(breedingAnalytics);
    }

    @PutMapping("/{id}")
    public BreedingAnalytics updateBreedingAnalytics(@PathVariable Long id, @RequestBody BreedingAnalytics breedingAnalyticsDetails) {
        BreedingAnalytics breedingAnalytics = breedingAnalyticsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Breeding analytics not found with id: " + id));
        
        breedingAnalytics.setAnimalId(breedingAnalyticsDetails.getAnimalId());
        breedingAnalytics.setBreedName(breedingAnalyticsDetails.getBreedName());
        breedingAnalytics.setBreedingDate(breedingAnalyticsDetails.getBreedingDate());
        breedingAnalytics.setOutcome(breedingAnalyticsDetails.getOutcome());
        breedingAnalytics.setNotes(breedingAnalyticsDetails.getNotes());
        breedingAnalytics.setSuccessful(breedingAnalyticsDetails.isSuccessful());
        
        return breedingAnalyticsRepository.save(breedingAnalytics);
    }

    @DeleteMapping("/{id}")
    public void deleteBreedingAnalytics(@PathVariable Long id) {
        breedingAnalyticsRepository.deleteById(id);
    }
}