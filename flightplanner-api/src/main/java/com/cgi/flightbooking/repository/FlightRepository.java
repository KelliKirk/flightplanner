// Kood genereeritud Claude AI poolt

package com.cgi.flightbooking.repository;

import com.cgi.flightbooking.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    
    List<Flight> findByDestination(String destination);
    
    List<Flight> findByOrigin(String origin);
    
    List<Flight> findByDepartureTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT f FROM Flight f WHERE f.price <= :maxPrice")
    List<Flight> findByPriceLessThanEqual(Double maxPrice);
    
    @Query("SELECT f FROM Flight f WHERE " +
           "(:destination IS NULL OR f.destination = :destination) AND " +
           "(:origin IS NULL OR f.origin = :origin) AND " +
           "(:departureDate IS NULL OR DATE(f.departureTime) = :departureDate) AND " +
           "(:maxPrice IS NULL OR f.price <= :maxPrice)")
    List<Flight> searchFlights(String destination, String origin, 
                               LocalDateTime departureDate, Double maxPrice);
}