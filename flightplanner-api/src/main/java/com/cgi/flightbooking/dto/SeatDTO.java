// Kood genereeritud chatGPT poolt

package com.cgi.flightbooking.dto;

public class SeatDTO {
    private Long id;
    private String seatNumber;
    private boolean occupied;
    private Long flightId;

    // Konstruktor
    public SeatDTO(Long id, String seatNumber, boolean occupied, Long flightId) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.occupied = occupied;
        this.flightId = flightId;
    }

    // Getterid ja setterid
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public boolean isOccupied() {
        return occupied;
    }

    public void setOccupied(boolean occupied) {
        this.occupied = occupied;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }
}
