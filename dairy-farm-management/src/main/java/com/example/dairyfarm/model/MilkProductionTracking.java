// MilkProductionTracking.java - dummy content for now
package com.example.dairyfarm.model;

public class MilkProductionTracking implements Tracking {

    private double quantityLitres;
    private String date;
    private String cowId;

    public MilkProductionTracking() {}

    @Override
    public String track() {
        return "Tracking milk production...";
    }

    // Getters and Setters
}
