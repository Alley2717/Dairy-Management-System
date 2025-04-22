package com.example.dairyfarm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dairyfarm.model.FeedInventory;
import com.example.dairyfarm.model.FeedTracking;
import com.example.dairyfarm.repository.FeedInventoryRepository;
import com.example.dairyfarm.repository.FeedTrackingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FeedService {

    @Autowired
    private FeedTrackingRepository feedTrackingRepository;
    
    @Autowired
    private FeedInventoryRepository feedInventoryRepository;

    @Transactional
    public FeedTracking createFeedTracking(FeedTracking feedTracking) {
        // Save the tracking record
        FeedTracking savedTracking = feedTrackingRepository.save(feedTracking);
        
        // Update the inventory by reducing the stock
        if (feedTracking.getFeedInventory() != null && feedTracking.getFeedInventory().getId() != null) {
            Optional<FeedInventory> inventoryOpt = feedInventoryRepository.findById(feedTracking.getFeedInventory().getId());
            if (inventoryOpt.isPresent()) {
                FeedInventory inventory = inventoryOpt.get();
                // Reduce the stock by the consumed quantity
                double newStock = inventory.getTotalStock() - feedTracking.getQuantityConsumed();
                // Ensure stock doesn't go below zero
                inventory.setTotalStock(Math.max(0, newStock));
                feedInventoryRepository.save(inventory);
            }
        }
        
        return savedTracking;
    }

    public FeedInventory createFeedInventory(FeedInventory feedInventory) {
        return feedInventoryRepository.save(feedInventory);
    }
    
    public FeedInventory addNewFeed(FeedInventory feedInventory) {
        return feedInventoryRepository.save(feedInventory);
    }
    
    public List<FeedInventory> getAllFeedInventory() {
        return feedInventoryRepository.findAll();
    }
    
    public FeedInventory getFeedInventoryById(Long id) {
        return feedInventoryRepository.findById(id).orElse(null);
    }
    
    public FeedInventory updateFeedInventory(FeedInventory feedInventory) {
        return feedInventoryRepository.save(feedInventory);
    }
}
