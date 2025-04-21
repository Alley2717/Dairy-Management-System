package com.example.dairyfarm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Animal implements AnimalPrototype {

    @Id
    private String id;

    private String breed;
    private int age;
    private String healthStatus;

    public Animal() {}

    public Animal(String id, String breed, int age, String healthStatus) {
        this.id = id;
        this.breed = breed;
        this.age = age;
        this.healthStatus = healthStatus;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getHealthStatus() { return healthStatus; }
    public void setHealthStatus(String healthStatus) { this.healthStatus = healthStatus; }

    // Prototype pattern method
    @Override
    public Animal clone() {
        return new Animal(this.id + "_clone", this.breed, this.age, this.healthStatus);
    }
}
