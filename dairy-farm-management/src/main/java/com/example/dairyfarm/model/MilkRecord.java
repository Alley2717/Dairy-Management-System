package com.example.dairyfarm.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class MilkRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private double quantity;

    @ManyToOne
    private Animal animal;

    // Getters and Setters
}
