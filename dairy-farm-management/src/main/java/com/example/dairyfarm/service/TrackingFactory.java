// TrackingFactory.java - dummy content for now
package com.example.dairyfarm.service;

import com.example.dairyfarm.model.*;

public class TrackingFactory {

    public static Tracking getTracking(String type) {
        switch (type.toLowerCase()) {
            case "milk":
                return new MilkProductionTracking();
            case "feed":
                return new FeedTracking();
            case "health":
                return new HealthTracking();
            case "breeding":
                return new BreedingAnalytics();
            default:
                throw new IllegalArgumentException("Unknown tracking type: " + type);
        }
    }
}
