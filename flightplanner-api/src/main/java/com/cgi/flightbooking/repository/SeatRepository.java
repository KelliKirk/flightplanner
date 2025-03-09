// Kood genereeritud chatGPT poolt

package com.cgi.flightbooking.repository;

import com.cgi.flightbooking.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByFlightId(Long flightId);
    List<Seat> findByFlightIdAndSeatNumberIn(Long flightId, List<String> seatNumbers);
}

