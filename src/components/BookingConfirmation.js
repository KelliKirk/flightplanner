import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const ConfirmationContainer = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 10px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: green;
  margin-bottom: 1rem;
`;

const ConfirmationDetails = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 5px;
  text-align: left;
`;

const Detail = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1rem;
`;

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flightId, seats } = location.state || { flightId: null, seats: [] };

  // Generate a random booking reference
  const bookingReference = 'BK' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleBackToSearch = () => {
    navigate('/');
  };

  if (!flightId) {
    return (
      <ConfirmationContainer>
        <h2>Booking Information Not Found</h2>
        <p>We couldn't find your booking information. Please try again.</p>
        <Button primary onClick={handleBackToSearch}>Back to Search</Button>
      </ConfirmationContainer>
    );
  }

  return (
    <ConfirmationContainer>
      <SuccessIcon>✓</SuccessIcon>
      <h2>Booking Confirmed!</h2>
      <p>Your seats have been successfully booked.</p>
      
      <ConfirmationDetails>
        <Detail><strong>Booking Reference:</strong> {bookingReference}</Detail>
        <Detail><strong>Flight ID:</strong> {flightId}</Detail>
        <Detail><strong>Seats:</strong> {seats.map(seat => seat.seatNumber).join(', ')}</Detail>
        <Detail><strong>Total Price:</strong> {seats.reduce((sum, seat) => sum + (seat.price || 0), 0)} €</Detail>
      </ConfirmationDetails>
      
      <Button primary onClick={handleBackToSearch}>Back to Search</Button>
    </ConfirmationContainer>
  );
};

export default BookingConfirmation;