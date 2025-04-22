package com.example.dairyfarm.repository;

import com.example.dairyfarm.model.FeedInventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedInventoryRepository extends JpaRepository<FeedInventory, Long> {
    // Custom queries can be added if needed
}
