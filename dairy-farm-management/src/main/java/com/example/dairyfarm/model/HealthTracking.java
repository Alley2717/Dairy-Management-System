// HealthTracking.java - dummy content for now
package com.example.dairyfarm.model;

public class HealthTracking implements Tracking {

    private String diseaseName;
    private String medication;
    private String cowId;
    private String date;

    public HealthTracking() {}

    @Override
    public String track() {
        return "Tracking animal health...";
    }

    // Getters and Setters
}
