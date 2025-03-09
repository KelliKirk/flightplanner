// Kood genereeritud Claude AI poolt

package com.cgi.flightbooking.controller;

import com.cgi.flightbooking.dto.SeatDTO;
import com.cgi.flightbooking.dto.SeatPreferenceDTO;
import com.cgi.flightbooking.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "*")
public class SeatController {
    private final SeatService seatService;
    
    @Autowired
    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }
    
    @GetMapping("/flight/{flightId}")
    public ResponseEntity<List<SeatDTO>> getSeatsForFlight(@PathVariable Long flightId) {
        return ResponseEntity.ok(seatService.getAllSeatsByFlightId(flightId));
    }
    
    @GetMapping("/flight/{flightId}/available")
    public ResponseEntity<List<SeatDTO>> getAvailableSeatsForFlight(@PathVariable Long flightId) {
        return ResponseEntity.ok(seatService.getAvailableSeatsByFlightId(flightId));
    }
    
    @PostMapping("/flight/{flightId}/recommend")
    public ResponseEntity<List<SeatDTO>> recommendSeats(
            @PathVariable Long flightId,
            @RequestBody SeatPreferenceDTO preferences) {
        
        return ResponseEntity.ok(seatService.recommendSeats(flightId, preferences));
    }
    
    @PostMapping("/flight/{flightId}/book")
    public ResponseEntity<List<SeatDTO>> bookSeats(
            @PathVariable Long flightId,
            @RequestBody List<String> seatCodes) {
        
        // You need to implement this method in the SeatService
        // For now, I'll leave a comment here
        return ResponseEntity.ok(seatService.bookSeats(flightId, seatCodes));
    }
}
