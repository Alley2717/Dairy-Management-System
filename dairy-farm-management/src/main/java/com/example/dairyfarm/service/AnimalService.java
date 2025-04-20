package com.example.dairyfarm.service;

import com.example.dairyfarm.model.Animal;
import com.example.dairyfarm.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    private Map<String, Animal> animalRegistry = new HashMap<>();

    public void addAnimal(Animal animal) {
        animalRepository.save(animal);
        animalRegistry.put(animal.getId(), animal);
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Animal cloneAnimal(String id) {
        Animal prototype = animalRegistry.get(id);
        if (prototype != null) {
            Animal cloned = prototype.clone();
            // Generate a new unique ID for the cloned animal
            cloned.setId(prototype.getId() + "_clone_" + System.currentTimeMillis());
            animalRepository.save(cloned);
            animalRegistry.put(cloned.getId(), cloned);
            return cloned;
        }
        return null;
    }
    public void updateAnimal(String id, Animal updatedAnimal) {
        Animal existing = animalRepository.findById(id).orElseThrow();
        existing.setName(updatedAnimal.getName());
        existing.setBreed(updatedAnimal.getBreed());
        existing.setAge(updatedAnimal.getAge());
        animalRepository.save(existing);
    }
    
    public void deleteAnimal(String id) {
        animalRepository.deleteById(id);
    }
    
}
