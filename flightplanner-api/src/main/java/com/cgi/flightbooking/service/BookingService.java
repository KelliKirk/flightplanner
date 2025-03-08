// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.service;

import com.cgi.flightbooking.exception.ResourceNotFoundException;
import com.cgi.flightbooking.model.Booking;
import com.cgi.flightbooking.model.Flight;
import com.cgi.flightbooking.model.Seat;
import com.cgi.flightbooking.repository.BookingRepository;
import com.cgi.flightbooking.repository.FlightRepository;
import com.cgi.flightbooking.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private FlightRepository flightRepository;
    
    @Autowired
    private SeatRepository seatRepository;
    
    @Transactional
    public Booking createBooking(Long flightId, List<Long> seatIds, String passengerName, String passengerEmail) {
        // Validate flight
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + flightId));
        
        // Validate and get seats
        List<Seat> seats = seatRepository.findAllById(seatIds);
        if (seats.size() != seatIds.size()) {
            throw new ResourceNotFoundException("One or more seats not found");
        }
        
        // Check if seats are available
        for (Seat seat : seats) {
            if (seat.isOccupied()) {
                throw new IllegalStateException("Seat " + seat.getSeatNumber() + " is already occupied");
            }
            if (!seat.getFlight().getId().equals(flightId)) {
                throw new IllegalStateException("Seat " + seat.getSeatNumber() + " does not belong to the specified flight");
            }
        }
        
        // Mark seats as occupied
        seats.forEach(seat -> {
            seat.setOccupied(true);
            seatRepository.save(seat);
        });
        
        // Calculate total price (simplified)
        double totalPrice = flight.getPrice() * seats.size();
        
        // Create booking
        Booking booking = new Booking();
        booking.setBookingReference(generateBookingReference());
        booking.setPassengerName(passengerName);
        booking.setPassengerEmail(passengerEmail);
        booking.setFlight(flight);
        booking.setSeats(seats);
        booking.setBookingTime(LocalDateTime.now());
        booking.setTotalPrice(totalPrice);
        
        return bookingRepository.save(booking);
    }
    
    public Booking getBookingByReference(String reference) {
        return bookingRepository.findByBookingReference(reference);
    }
    
    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByPassengerEmail(email);
    }
    
    private String generateBookingReference() {
        // Generate a unique booking reference
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
