// TrackingService.java - dummy content for now
package com.example.dairyfarm.service;

import com.example.dairyfarm.model.Tracking;
import com.example.dairyfarm.model.FeedTracking;
import com.example.dairyfarm.model.MilkProductionTracking;
import com.example.dairyfarm.model.BreedingAnalytics;
import com.example.dairyfarm.model.HealthTracking;
import org.springframework.stereotype.Service;

@Service
public class TrackingService {

    public String track(String type) {
        Tracking tracker = TrackingFactory.getTracking(type);
        return tracker.track();
    }
}
