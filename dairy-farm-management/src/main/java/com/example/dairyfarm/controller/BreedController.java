package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.Breed;
import com.example.dairyfarm.repository.BreedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // Allow CORS for frontend dev
@RestController
@RequestMapping("/api/breeds")
public class BreedController {

    @Autowired
    private BreedRepository breedRepository;

    @GetMapping
    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    @GetMapping("/{id}")
    public Breed getBreedById(@PathVariable Long id) {
        return breedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Breed not found with id: " + id));
    }

    @PostMapping
    public Breed addBreed(@RequestBody Breed breed) {
        System.out.println(breed);
        return breedRepository.save(breed);
    }

    @PutMapping("/{id}")
    public Breed updateBreed(@PathVariable Long id, @RequestBody Breed breedDetails) {
        Breed breed = breedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Breed not found with id: " + id));
        
        breed.setBreedName(breedDetails.getBreedName());
        breed.setOrigin(breedDetails.getOrigin());
        breed.setCharacteristics(breedDetails.getCharacteristics());
        breed.setMilkProduction(breedDetails.getMilkProduction());
        breed.setTemperament(breedDetails.getTemperament());
        
        return breedRepository.save(breed);
    }

    @DeleteMapping("/{id}")
    public void deleteBreed(@PathVariable Long id) {
        breedRepository.deleteById(id);
    }
}