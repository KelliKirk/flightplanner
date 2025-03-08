// Kood genereeritud Claude AI poolt

package main.java.com.cgi.flightbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightSearchDTO {
    private String origin;
    private String destination;
    private LocalDate departureDate;
    private Double maxPrice;
}