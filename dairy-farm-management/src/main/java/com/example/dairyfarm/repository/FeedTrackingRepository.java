package com.example.dairyfarm.repository;

import com.example.dairyfarm.model.FeedTracking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedTrackingRepository extends JpaRepository<FeedTracking, Long> {
    // Custom queries can be added if needed
}
