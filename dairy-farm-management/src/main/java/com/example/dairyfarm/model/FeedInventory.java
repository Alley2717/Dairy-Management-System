package com.example.dairyfarm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class FeedInventory {

    @Id
    private Long id;
    private String feedType;
    private Double totalStock;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeedType() {
        return feedType;
    }

    public void setFeedType(String feedType) {
        this.feedType = feedType;
    }

    public Double getTotalStock() {
        return totalStock;
    }

    public void setTotalStock(Double totalStock) {
        this.totalStock = totalStock;
    }
}
