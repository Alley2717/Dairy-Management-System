package com.example.dairyfarm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class FeedTracking implements Tracking {

    @Id
    private Long id;
    private Double quantityConsumed;
    private String date;
    
    @ManyToOne
    private FeedInventory feedInventory;

    @Override
    public String track() {
        // Implement the track method from the Tracking interface
        return "Tracking Feed ID: " + id + ", Quantity: " + quantityConsumed;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantityConsumed() {
        return quantityConsumed;
    }

    public void setQuantityConsumed(Double quantityConsumed) {
        this.quantityConsumed = quantityConsumed;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public FeedInventory getFeedInventory() {
        return feedInventory;
    }

    public void setFeedInventory(FeedInventory feedInventory) {
        this.feedInventory = feedInventory;
    }
}
