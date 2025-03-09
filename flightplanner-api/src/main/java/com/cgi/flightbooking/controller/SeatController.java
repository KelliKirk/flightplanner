// Kood genereeritud Claude AI poolt

package com.cgi.flightbooking.controller;

import com.cgi.flightplanner.dto.SeatPreference;
import com.cgi.flightplanner.dto.SeatRecommendation;
import com.cgi.flightplanner.model.Seat;
import com.cgi.flightplanner.service.SeatService;
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
    public ResponseEntity<List<Seat>> getSeatsForFlight(@PathVariable Long flightId) {
        return ResponseEntity.ok(seatService.getSeatsForFlight(flightId));
    }

    @GetMapping("/flight/{flightId}/available")
    public ResponseEntity<List<Seat>> getAvailableSeatsForFlight(@PathVariable Long flightId) {
        return ResponseEntity.ok(seatService.getAvailableSeatsForFlight(flightId));
    }

    @PostMapping("/flight/{flightId}/recommend")
    public ResponseEntity<SeatRecommendationDTO> recommendSeats(
            @PathVariable Long flightId,
            @RequestParam int numberOfPassengers,
            @RequestBody SeatPreference preferences) {
        
        return ResponseEntity.ok(seatService.recommendSeats(flightId, numberOfPassengers, preferences));
    }

    @PostMapping("/flight/{flightId}/book")
    public ResponseEntity<List<Seat>> bookSeats(
            @PathVariable Long flightId,
            @RequestBody List<String> seatCodes) {
        
        return ResponseEntity.ok(seatService.bookSeats(flightId, seatCodes));
    }
}
