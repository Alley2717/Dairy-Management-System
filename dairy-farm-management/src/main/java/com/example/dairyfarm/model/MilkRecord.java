package com.example.dairyfarm.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
public class MilkRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private double quantity;

    @Column(name = "animal_id")
    private String animalId;

    // Manually added setters (if Lombok fails)
    public void setDate(String date) {
        this.date = date;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public void setAnimalId(String animalId) {
        this.animalId = animalId;
    }
}
