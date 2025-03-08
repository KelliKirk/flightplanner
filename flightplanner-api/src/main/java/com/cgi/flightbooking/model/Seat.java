// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String seatNumber;
    
    @Enumerated(EnumType.STRING)
    private SeatType seatType;
    
    @Enumerated(EnumType.STRING)
    private SeatClass seatClass;
    
    private boolean isWindowSeat;
    
    private boolean isExitRowSeat;
    
    private boolean hasExtraLegroom;
    
    private boolean isOccupied;
    
    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;
    
    public enum SeatType {
        WINDOW, MIDDLE, AISLE
    }
    
    public enum SeatClass {
        FIRST, BUSINESS, ECONOMY
    }
}