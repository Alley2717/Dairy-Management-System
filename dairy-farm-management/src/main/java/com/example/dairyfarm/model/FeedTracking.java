// FeedTracking.java - dummy content for now
package com.example.dairyfarm.model;

public class FeedTracking implements Tracking {

    private String feedType;
    private double quantityKg;
    private String cowId;
    private String date;

    public FeedTracking() {}

    @Override
    public String track() {
        return "Tracking feed usage...";
    }

    // Getters and Setters
}
