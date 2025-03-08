// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.service;

import com.cgi.flightbooking.dto.FlightDTO;
import com.cgi.flightbooking.dto.FlightSearchDTO;
import com.cgi.flightbooking.exception.ResourceNotFoundException;
import com.cgi.flightbooking.model.Flight;
import com.cgi.flightbooking.repository.FlightRepository;
import com.cgi.flightbooking.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;
    
    @Autowired
    private SeatRepository seatRepository;
    
    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public FlightDTO getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + id));
        return convertToDTO(flight);
    }
    
    public List<FlightDTO> searchFlights(FlightSearchDTO searchDTO) {
        LocalDateTime departureDate = null;
        if (searchDTO.getDepartureDate() != null) {
            departureDate = searchDTO.getDepartureDate().atStartOfDay();
        }
        
        return flightRepository.searchFlights(
                searchDTO.getDestination(),
                searchDTO.getOrigin(),
                departureDate,
                searchDTO.getMaxPrice()
        ).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private FlightDTO convertToDTO(Flight flight) {
        long availableSeats = flight.getSeats() != null ? 
                flight.getSeats().stream().filter(seat -> !seat.isOccupied()).count() : 0;
        
        return new FlightDTO(
                flight.getId(),
                flight.getFlightNumber(),
                flight.getOrigin(),
                flight.getDestination(),
                flight.getDepartureTime(),
                flight.getArrivalTime(),
                flight.getPrice(),
                (int) availableSeats,
                flight.getAircraft()
        );
    }
    
    // Method to initialize some test data
    public void initializeTestData() {
        // This would be called during app startup to populate the DB with test data
    }
}