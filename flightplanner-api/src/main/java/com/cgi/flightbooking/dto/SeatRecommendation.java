// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatRecommendation {
    private List<Seat> recommendedSeats;
    private Map<String, Double> matchScores; // How well each seat matches preferences (0-100%)
    private String reasonForRecommendation;
}