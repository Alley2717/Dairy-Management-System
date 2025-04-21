// src/main/java/com/example/dairyfarm/controller/MilkRecordController.java
package com.example.dairyfarm.controller;

import com.example.dairyfarm.dto.MilkRecordDTO;
import com.example.dairyfarm.model.MilkRecord;
import com.example.dairyfarm.repository.MilkRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/milk-records")
public class MilkRecordController {

    @Autowired
    private MilkRecordRepository milkRecordRepository;

    @GetMapping
    public List<MilkRecord> getAllRecords() {
        return milkRecordRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<MilkRecord> addRecord(@RequestBody MilkRecordDTO dto) {
        // log what you got
        System.out.println("POST payload → animalId=" + dto.getAnimalId()
                           + ", date=" + dto.getDate()
                           + ", quantity=" + dto.getQuantity());

        // map DTO → entity
        MilkRecord record = new MilkRecord();
        record.setAnimalId(dto.getAnimalId());
        record.setDate(dto.getDate());
        record.setQuantity(dto.getQuantity());

        MilkRecord saved = milkRecordRepository.save(record);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }
}
