package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.MilkRecord;
import com.example.dairyfarm.repository.MilkRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/milk-records")
public class MilkRecordController {

    @Autowired
    private MilkRecordRepository milkRecordRepository;

    @GetMapping
    public List<MilkRecord> getAllMilkRecords() {
        return milkRecordRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMilkRecordById(@PathVariable Long id) {
        try {
            MilkRecord milkRecord = milkRecordRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Milk record not found with id: " + id));
            return ResponseEntity.ok(milkRecord);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving milk record: " + e.getMessage());
        }
    }
    
    @GetMapping("/animal/{animalId}")
    public ResponseEntity<?> getMilkRecordsByAnimalId(@PathVariable String animalId) {
        try {
            List<MilkRecord> records = milkRecordRepository.findByAnimalId(animalId);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving milk records: " + e.getMessage());
        }
    }
    
    @GetMapping("/date/{date}")
    public ResponseEntity<?> getMilkRecordsByDate(@PathVariable String date) {
        try {
            List<MilkRecord> records = milkRecordRepository.findByDate(date);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving milk records: " + e.getMessage());
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<?> getMilkStats() {
        try {
            List<MilkRecord> allRecords = milkRecordRepository.findAll();
            
            double totalQuantity = allRecords.stream()
                    .mapToDouble(MilkRecord::getQuantity)
                    .sum();
            
            long totalRecords = allRecords.size();
            
            double averageQuantity = totalRecords > 0 ? totalQuantity / totalRecords : 0;
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalQuantity", totalQuantity);
            stats.put("totalRecords", totalRecords);
            stats.put("averageQuantity", averageQuantity);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving milk stats: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addMilkRecord(@RequestBody MilkRecord milkRecord) {
        try {
            // Debug information
            System.out.println("Received milk record: " + milkRecord);
            
            // Validate the milk record
            if (milkRecord.getAnimalId() == null || milkRecord.getAnimalId().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Animal ID cannot be empty");
            }
            
            if (milkRecord.getDate() == null || milkRecord.getDate().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Date cannot be empty");
            }
            
            if (milkRecord.getQuantity() <= 0) {
                return ResponseEntity.badRequest().body("Quantity must be greater than 0");
            }
            
            // Save the milk record
            MilkRecord savedRecord = milkRecordRepository.save(milkRecord);
            System.out.println("Saved milk record: " + savedRecord);
            
            return ResponseEntity.ok(savedRecord);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding milk record: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMilkRecord(@PathVariable Long id, @RequestBody MilkRecord milkRecordDetails) {
        try {
            MilkRecord milkRecord = milkRecordRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Milk record not found with id: " + id));
            
            // Validate the milk record
            if (milkRecordDetails.getAnimalId() == null || milkRecordDetails.getAnimalId().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Animal ID cannot be empty");
            }
            
            if (milkRecordDetails.getDate() == null || milkRecordDetails.getDate().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Date cannot be empty");
            }
            
            if (milkRecordDetails.getQuantity() <= 0) {
                return ResponseEntity.badRequest().body("Quantity must be greater than 0");
            }
            
            milkRecord.setDate(milkRecordDetails.getDate());
            milkRecord.setQuantity(milkRecordDetails.getQuantity());
            milkRecord.setAnimalId(milkRecordDetails.getAnimalId());
            
            MilkRecord updatedRecord = milkRecordRepository.save(milkRecord);
            return ResponseEntity.ok(updatedRecord);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating milk record: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMilkRecord(@PathVariable Long id) {
        try {
            MilkRecord milkRecord = milkRecordRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Milk record not found with id: " + id));
            
            milkRecordRepository.delete(milkRecord);
            
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting milk record: " + e.getMessage());
        }
    }
}