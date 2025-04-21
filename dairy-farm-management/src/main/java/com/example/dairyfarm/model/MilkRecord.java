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

    // Constructors
    public MilkRecord() {
    }

    public MilkRecord(LocalDate date, double quantity) {
        this.date = date;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    @Override
    public String toString() {
        return "MilkRecord{" +
                "id=" + id +
                ", date=" + date +
                ", quantity=" + quantity +
                ", animal=" + (animal != null ? animal.getId() : "null") +
                '}';
    }
}
