// Kood genereeritud chatGPT poolt

package com.cgi.flightbooking.service;

import com.cgi.flightbooking.dto.SeatDTO;
import com.cgi.flightbooking.dto.SeatPreferenceDTO;
import com.cgi.flightbooking.exception.ResourceNotFoundException;
import com.cgi.flightbooking.model.Flight;
import com.cgi.flightbooking.model.Seat;
import com.cgi.flightbooking.repository.FlightRepository;
import com.cgi.flightbooking.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        List<Seat> seats = seatRepository.findByFlightId(flightId);
        return seats.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<SeatDTO> getAvailableSeatsByFlightId(Long flightId) {
        List<Seat> seats = seatRepository.findByFlightId(flightId)
                .stream()
                .filter(seat -> !seat.isOccupied())
                .collect(Collectors.toList());
        return seats.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<SeatDTO> recommendSeats(Long flightId, SeatPreferenceDTO preferences) {
        List<Seat> seats = seatRepository.findByFlightId(flightId);
        
        // Sorteerime istmed eelistuste järgi
        seats.sort(Comparator.comparing(Seat::getSeatNumber));

        List<Seat> recommendedSeats = seats.stream()
                .filter(seat -> !seat.isOccupied())
                .limit(preferences.getPreferredSeatsCount())
                .collect(Collectors.toList());

        return recommendedSeats.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public List<SeatDTO> bookSeats(Long flightId, List<String> seatCodes) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + flightId));

        List<Seat> seats = seatRepository.findByFlightIdAndSeatNumberIn(flightId, seatCodes);

        if (seats.size() != seatCodes.size()) {
            throw new ResourceNotFoundException("One or more seats not found");
        }

        for (Seat seat : seats) {
            if (seat.isOccupied()) {
                throw new IllegalStateException("Seat " + seat.getSeatNumber() + " is already occupied");
            }
        }

        seats.forEach(seat -> seat.setOccupied(true));
        seats = seatRepository.saveAll(seats);

        return seats.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private SeatDTO convertToDTO(Seat seat) {
        return new SeatDTO(
                seat.getId(),
                seat.getSeatNumber(),
                seat.isOccupied(),
                seat.getFlight().getId()
        );
    }
}
