package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.FeedTracking;
import com.example.dairyfarm.model.FeedInventory;
import com.example.dairyfarm.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

    @PostMapping("/track")
    public FeedTracking createFeedTracking(@RequestBody FeedTracking feedTracking) {
        return feedService.createFeedTracking(feedTracking);
    }

    @PostMapping("/inventory")
    public FeedInventory createFeedInventory(@RequestBody FeedInventory feedInventory) {
        return feedService.createFeedInventory(feedInventory);
    }

    @PostMapping("/addFeed")
    public FeedInventory addNewFeed(@RequestBody FeedInventory feedInventory) {
        return feedService.addNewFeed(feedInventory);
    }

    // Add this new endpoint to get all feeds
    @GetMapping("/all")
    public List<FeedInventory> getAllFeeds() {
        return feedService.getAllFeedInventory();
    }
    
    /*@GetMapping("/all")
    public List<FeedInventory> getAllFeeds() {
        return feedInventoryRepository.findAll();
    }*/

    // Add this endpoint to get a specific feed by ID
    @GetMapping("/{id}")
    public ResponseEntity<FeedInventory> getFeedById(@PathVariable Long id) {
        FeedInventory feedInventory = feedService.getFeedInventoryById(id);
        if (feedInventory != null) {
            return ResponseEntity.ok(feedInventory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Add this endpoint to update feed inventory after consumption
    @PutMapping("/update/{id}")
    public ResponseEntity<FeedInventory> updateFeedInventory(
            @PathVariable Long id, 
            @RequestBody FeedInventory feedInventory) {
        if (!id.equals(feedInventory.getId())) {
            return ResponseEntity.badRequest().build();
        }
        FeedInventory updatedInventory = feedService.updateFeedInventory(feedInventory);
        return ResponseEntity.ok(updatedInventory);
    }
}
