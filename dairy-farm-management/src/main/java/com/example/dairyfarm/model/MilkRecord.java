package com.example.dairyfarm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "milk_record")
public class MilkRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "date")
    private String date;
    
    @Column(name = "quantity", nullable = false)
    private double quantity;
    
    @Column(name = "animal_id")
    private String animalId;
    
    // Default constructor
    public MilkRecord() {
        // Initialize with default values to prevent null
        this.quantity = 0.0;
    }
    
    // Constructor with parameters
    public MilkRecord(String date, double quantity, String animalId) {
        this.date = date;
        this.quantity = quantity;
        this.animalId = animalId;
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public String getAnimalId() {
        return animalId;
    }

    public void setAnimalId(String animalId) {
        this.animalId = animalId;
    }
    
    @Override
    public String toString() {
        return "MilkRecord [id=" + id + ", date=" + date + ", quantity=" + quantity + ", animalId=" + animalId + "]";
    }
}