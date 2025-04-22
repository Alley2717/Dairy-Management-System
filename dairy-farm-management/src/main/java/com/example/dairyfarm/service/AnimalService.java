package com.example.dairyfarm.service;

import com.example.dairyfarm.model.Animal;
import com.example.dairyfarm.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;

    @Autowired
    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Optional<Animal> getAnimalById(Long id) {
        return animalRepository.findById(id);
    }

    public Animal saveAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    public Animal updateAnimal(Long id, Animal animalDetails) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found with id: " + id));

        animal.setAnimalId(animalDetails.getAnimalId());
        animal.setName(animalDetails.getName());
        animal.setDob(animalDetails.getDob());
        animal.setBreed(animalDetails.getBreed());
        animal.setGender(animalDetails.getGender());
        animal.setNotes(animalDetails.getNotes());

        return animalRepository.save(animal);
    }

    public void deleteAnimal(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found with id: " + id));
        animalRepository.delete(animal);
    }
}