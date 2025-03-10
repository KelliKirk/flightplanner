// Kood genereeritud Claude AI poolt

package com.cgi.flightbooking.controller;

import com.cgi.flightbooking.dto.FlightDTO;
import com.cgi.flightbooking.dto.FlightSearchDTO;
import com.cgi.flightbooking.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {
    private final FlightService flightService;
    
    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }
    
    @GetMapping
    public ResponseEntity<List<FlightDTO>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }
    
    @GetMapping("/filter")
    public ResponseEntity<List<FlightDTO>> getFilteredFlights(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) Double maxPrice) {
        
        FlightSearchDTO searchDTO = new FlightSearchDTO();
        searchDTO.setDestination(destination);
        searchDTO.setOrigin(origin);
        searchDTO.setDepartureDate(date);
        searchDTO.setMaxPrice(maxPrice);
        
        return ResponseEntity.ok(flightService.searchFlights(searchDTO));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FlightDTO> getFlightById(@PathVariable Long id) {
        try {
            FlightDTO flight = flightService.getFlightById(id);
            return ResponseEntity.ok(flight);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}