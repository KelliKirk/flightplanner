// Kood genereeritud Claude AI poolt

package com.cgi.flightbooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String bookingReference;
    
    private String passengerName;
    
    private String passengerEmail;
    
    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;
    
    @ManyToMany
    @JoinTable(
        name = "booking_seats",
        joinColumns = @JoinColumn(name = "booking_id"),
        inverseJoinColumns = @JoinColumn(name = "seat_id")
    )
    private List<Seat> seats;
    
    private LocalDateTime bookingTime;
    
    private Double totalPrice;
}
