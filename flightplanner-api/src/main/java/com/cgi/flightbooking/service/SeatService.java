// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.service;

import com.cgi.flightbooking.dto.SeatDTO;
import com.cgi.flightbooking.dto.SeatPreferenceDTO;
import com.cgi.flightbooking.exception.ResourceNotFoundException;
import com.cgi.flightbooking.model.Flight;
import com.cgi.flightbooking.model.Seat;
import com.cgi.flightbooking.repository.FlightRepository;
import com.cgi.flightbooking.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;
    
    @Autowired
    private FlightRepository flightRepository;
    
    public List<SeatDTO> getAllSeatsByFlightId(Long flightId) {
        return seatRepository.findByFlightId(flightId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<SeatDTO> getAvailableSeatsByFlightId(Long flightId) {
        return seatRepository.findByFlightIdAndIsOccupied(flightId, false).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<SeatDTO> recommendSeats(Long flightId, SeatPreferenceDTO preferences) {
        // Basic recommendation based on user preferences
        List<Seat> availableSeats = seatRepository.findAvailableSeatsByPreferences(
                flightId, 
                preferences.getIsWindowSeat(),
                preferences.getHasExtraLegroom(),
                preferences.getIsExitRowSeat(),
                preferences.getSeatClass()
        );
        
        if (availableSeats.isEmpty()) {
            return Collections.emptyList();
        }
        
        // If adjacent seats are required, find them
        if (preferences.getRequireAdjacentSeats() && preferences.getNumberOfSeats() > 1) {
            return findAdjacentSeats(availableSeats, preferences.getNumberOfSeats());
        }
        
        // Otherwise, just return the top N seats based on preferences
        int numSeatsToReturn = Math.min(preferences.getNumberOfSeats(), availableSeats.size());
        return availableSeats.stream()
                .limit(numSeatsToReturn)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private List<SeatDTO> findAdjacentSeats(List<Seat> availableSeats, int numberOfSeats) {
        // This is a simplified implementation
        // In a real system, you'd need to analyze the aircraft configuration
        // and find truly adjacent seats
        
        // Sort seats by seat number to get them in sequence
        availableSeats.sort(Comparator.comparing(Seat::getSeatNumber));
        
        List<SeatDTO> result = new ArrayList<>();
        for (int i = 0; i <= availableSeats.size() - numberOfSeats; i++) {
            boolean areAdjacent = true;
            
            // Check if seats are adjacent (this is very simplified)
            for (int j = 0; j < numberOfSeats - 1; j++) {
                Seat current = availableSeats.get(i + j);
                Seat next = availableSeats.get(i + j + 1);
                
                // This logic would need to be adapted based on your seat numbering scheme
                String currNumber = current.getSeatNumber();
                String nextNumber = next.getSeatNumber();
                
                // Very basic adjacency check - assumes seats like 10A, 10B are adjacent
                if (!currNumber.substring(0, currNumber.length() - 1)
                        .equals(nextNumber.substring(0, nextNumber.length() - 1))) {
                    areAdjacent = false;
                    break;
                }
            }
            
            if (areAdjacent) {
                for (int j = 0; j < numberOfSeats; j++) {
                    result.add(convertToDTO(availableSeats.get(i + j)));
                }
                return result;
            }
        }
        
        // If no adjacent seats found, return best available seats
        return availableSeats.stream()
                .limit(numberOfSeats)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private SeatDTO convertToDTO(Seat seat) {
        return new SeatDTO(
                seat.getId(),
                seat.getSeatNumber(),
                seat.getSeatType(),
                seat.getSeatClass(),
                seat.isWindowSeat(),
                seat.isExitRowSeat(),
                seat.hasExtraLegroom(),
                seat.isOccupied()
        );
    }
    
    // Method to generate random seat map for a flight
    public void generateSeatMapForFlight(Long flightId, int rows, int seatsPerRow) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + flightId));
        
        List<Seat> seats = new ArrayList<>();
        String[] columns = {"A", "B", "C", "D", "E", "F"};
        
        for (int row = 1; row <= rows; row++) {
            for (int col = 0; col < Math.min(seatsPerRow, columns.length); col++) {
                String seatNumber = row + columns[col];
                
                Seat seat = new Seat();
                seat.setSeatNumber(seatNumber);
                
                // Determine seat type
                if (col == 0 || col == seatsPerRow - 1) {
                    seat.setSeatType(Seat.SeatType.WINDOW);
                    seat.setWindowSeat(true);
                } else if (col == 1 || col == seatsPerRow - 2) {
                    seat.setSeatType(Seat.SeatType.MIDDLE);
                } else {
                    seat.setSeatType(Seat.SeatType.AISLE);
                }
                
                // Set seat class (example: first few rows are business class)
                if (row <= 2) {
                    seat.setSeatClass(Seat.SeatClass.FIRST);
                } else if (row <= 5) {
                    seat.setSeatClass(Seat.SeatClass.BUSINESS);
                } else {
                    seat.setSeatClass(Seat.SeatClass.ECONOMY);
                }
                
                // Set exit row seats
                seat.setExitRowSeat(row == 10 || row == 20);
                
                // Set extra legroom (exit rows or first row of each section)
                seat.setHasExtraLegroom(seat.isExitRowSeat() || row == 1 || row == 3 || row == 6);
                
                // Randomly mark some seats as occupied
                seat.setOccupied(Math.random() < 0.3); // 30% chance of being occupied
                
                seat.setFlight(flight);
                seats.add(seat);
            }
        }
        
        seatRepository.saveAll(seats);
    }
}
