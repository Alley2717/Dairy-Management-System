package com.example.dairyfarm.service;

import com.example.dairyfarm.model.Animal;
import com.example.dairyfarm.model.MilkRecord;
import com.example.dairyfarm.repository.AnimalRepository;
import com.example.dairyfarm.repository.MilkRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MilkService {

    @Autowired
    private MilkRecordRepository milkRepo;

    @Autowired
    private AnimalRepository animalRepo;

    public void addMilkRecord(String animalId, MilkRecord record) {
        Animal animal = animalRepo.findById(animalId).orElseThrow();
        record.setAnimal(animal);
        milkRepo.save(record);
    }
}
