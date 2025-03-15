import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { bookFlight } from '../services/api';

const SeatContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 10px;
`;

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin: 1.5rem 0;
`;

const Seat = styled.div`
  padding: 1rem;
  text-align: center;
  border-radius: 5px;
  cursor: ${({ isAvailable }) => (isAvailable ? 'pointer' : 'not-allowed')};
  background-color: ${({ isSelected, isAvailable, theme }) =>
    isSelected
      ? theme.colors.primary
      : isAvailable
      ? '#ffffff'
      : '#cccccc'};
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#333333')};
  border: 1px solid #ddd;
  
  &:hover {
    ${({ isAvailable }) =>
      isAvailable &&
      `
      background-color: #f0f0f0;
      transform: scale(1.05);
    `}
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const SeatSelection = ({ flightId, seats, onClose }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await bookFlight({
        flightId,
        seatIds: selectedSeats,
        passengerName: 'Testing User',
        email: 'test@example.com'
      });
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SeatContainer>
      <h3>Select seats for flight ID: {flightId}</h3>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Seats booked successfully!</p>}
      
      <SeatGrid>
        {seats.map(seat => (
          <Seat
            key={seat.id}
            isAvailable={!seat.booked}
            isSelected={selectedSeats.includes(seat.id)}
            onClick={() => !seat.booked && toggleSeatSelection(seat.id)}
          >
            {seat.seatNumber} 
            {seat.booked && " (Booked)"}
          </Seat>
        ))}
      </SeatGrid>
      
      <p>Selected seats: {selectedSeats.length}</p>
      
      <ActionButtons>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          primary 
          onClick={handleBooking} 
          disabled={loading || selectedSeats.length === 0 || success}
        >
          {loading ? 'Booking...' : 'Book selected seats'}
        </Button>
      </ActionButtons>
    </SeatContainer>
  );
};

export default SeatSelection;