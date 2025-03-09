// Kood genereeritud Claude AI poolt

package com.cgi.flightbooking.dto;

import com.cgi.flightbooking.model.Seat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatDTO {
    private Long id;
    private String seatNumber;
    private Seat.SeatType seatType;
    private Seat.SeatClass seatClass;
    private boolean isWindowSeat;
    private boolean isExitRowSeat;
    private boolean hasExtraLegroom;
    private boolean isOccupied;
}
