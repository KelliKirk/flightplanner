// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.repository;

import com.cgi.flightbooking.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    
    List<Seat> findByFlightId(Long flightId);
    
    List<Seat> findByFlightIdAndIsOccupied(Long flightId, boolean isOccupied);
    
    @Query("SELECT s FROM Seat s WHERE s.flight.id = :flightId AND " +
           "(:isWindowSeat IS NULL OR s.isWindowSeat = :isWindowSeat) AND " +
           "(:hasExtraLegroom IS NULL OR s.hasExtraLegroom = :hasExtraLegroom) AND " +
           "(:isExitRowSeat IS NULL OR s.isExitRowSeat = :isExitRowSeat) AND " +
           "(:seatClass IS NULL OR s.seatClass = :seatClass) AND " +
           "s.isOccupied = false")
    List<Seat> findAvailableSeatsByPreferences(Long flightId, Boolean isWindowSeat, 
                                 Boolean hasExtraLegroom, Boolean isExitRowSeat, 
                                 Seat.SeatClass seatClass);
}
