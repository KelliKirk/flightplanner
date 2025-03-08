// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.repository;

import com.cgi.flightbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    Booking findByBookingReference(String bookingReference);
    
    List<Booking> findByPassengerEmail(String passengerEmail);
    
    List<Booking> findByFlightId(Long flightId);
}
