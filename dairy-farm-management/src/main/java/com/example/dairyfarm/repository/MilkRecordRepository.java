package com.example.dairyfarm.repository;

import com.example.dairyfarm.model.MilkRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MilkRecordRepository extends JpaRepository<MilkRecord, Long> {
    
    // Find milk records by animal ID
    List<MilkRecord> findByAnimalId(String animalId);
    
    // Find milk records by date
    List<MilkRecord> findByDate(String date);
    
    // Custom query to find total milk quantity for a specific date
    @Query("SELECT SUM(m.quantity) FROM MilkRecord m WHERE m.date = ?1")
    Double getTotalQuantityByDate(String date);
    
    // Custom query to find total milk quantity for a specific animal
    @Query("SELECT SUM(m.quantity) FROM MilkRecord m WHERE m.animalId = ?1")
    Double getTotalQuantityByAnimalId(String animalId);
}