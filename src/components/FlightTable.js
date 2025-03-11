import styled from 'styled-components';
import Button from './Button';
import { useState } from 'react';
import { getSeatsForFlight } from '../services/api';
import SeatSelection from './SeatSelection';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  background-color: ${({ theme }) => theme.colors.header};
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const FlightTable = ({ flights }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelectFlight = async (flightId) => {
    setLoading(true);
    try {
      const seatsData = await getSeatsForFlight(flightId);
      setSeats(seatsData);
      setSelectedFlight(flightId);
    } catch (error) {
      console.error("Failed to load seats", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>Airline</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Departure Time</Th>
            <Th>Arrival Time</Th>
            <Th>Price</Th>
            <Th>Activities</Th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <Td>{flight.airline}</Td>
              <Td>{flight.origin}</Td>
              <Td>{flight.destination}</Td>
              <Td>{new Date(flight.departureTime).toLocaleString()}</Td>
              <Td>{new Date(flight.arrivalTime).toLocaleString()}</Td>
              <Td>{flight.price} €</Td>
              <Td>
                <Button 
                  onClick={() => handleSelectFlight(flight.id)}
                  disabled={loading}
                >
                  Select seats
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedFlight && seats.length > 0 && (
        <SeatSelection 
          flightId={selectedFlight} 
          seats={seats} 
          onClose={() => setSelectedFlight(null)} 
        />
      )}
    </>
  );
};

export default FlightTable;