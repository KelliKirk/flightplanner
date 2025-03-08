// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.dto;

import com.cgi.flightbooking.model.Seat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatPreferenceDTO {
    private Boolean isWindowSeat;
    private Boolean hasExtraLegroom;
    private Boolean isExitRowSeat;
    private Seat.SeatClass seatClass;
    private Integer numberOfSeats;
    private Boolean requireAdjacentSeats;
}


