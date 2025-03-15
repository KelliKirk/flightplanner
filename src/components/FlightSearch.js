import { useState } from 'react';
import styled from 'styled-components';
import { Flex } from './styled/flex.styled';
import Button from './Button';
import FlightTable from './FlightTable';
import SearchFilter from './SearchFilter';
import ErrorMessage from './ErrorMessage';
import { fetchFlights } from '../services/api';

const SearchContainer = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.header};
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Asetab nupu paremale */
  width: 100%;
  margin-top: 1rem; /* Lisa vahe filtrite ja nupu vahele */
`;

const StyledButton = styled(Button)`
  padding: 0.5rem 1rem; /* Väiksem nupp */
  font-size: 0.9rem;
`;

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    passengers: 1
  });

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
    setValidationError(null);
  };

  const validateFilters = () => {
    if (!filters.origin) {
      setValidationError('Please select an origin city');
      return false;
    }
    if (!filters.destination) {
      setValidationError('Please select a destination city');
      return false;
    }
    if (!filters.departureDate) {
      setValidationError('Please select a departure date');
      return false;
    }
    if (filters.origin === filters.destination) {
      setValidationError('Origin and destination cannot be the same');
      return false;
    }
    return true;
  };

  const handleSearch = async () => {
    if (!validateFilters()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const flightsData = await fetchFlights(filters);

      if (flightsData.length === 0) {
        setError('No flights found matching your criteria. Please try different dates or destinations.');
      } else {
        setFlights(flightsData);
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContainer id="flight-search">
      <h2>Search flights</h2>

      <Flex>
        <SearchFilter 
          name="origin" 
          label="From" 
          value={filters.origin} 
          onChange={handleFilterChange} 
          options={['Tallinn', 'Riga', 'Helsinki', 'Vilnius', 'London', 'Paris']} 
        />

        <SearchFilter 
          name="destination" 
          label="To" 
          value={filters.destination} 
          onChange={handleFilterChange}
          options={['London', 'Paris', 'Berlin', 'New York', 'Tallinn', 'Riga']} 
        />

        <SearchFilter 
          name="departureDate" 
          label="Departure date" 
          value={filters.departureDate} 
          onChange={handleFilterChange}
          type="date" 
          min={new Date().toISOString().split('T')[0]} 
        />

        <SearchFilter 
          name="passengers" 
          label="Passengers" 
          value={filters.passengers} 
          onChange={handleFilterChange}
          type="number" 
          min="1"
          max="9"
        />
      </Flex>

      <ButtonContainer>
        <StyledButton primary onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search flights'}
        </StyledButton>
      </ButtonContainer>

      {validationError && <ErrorMessage message={validationError} />}
      {error && <ErrorMessage message={error} />}

      {flights.length > 0 && <FlightTable flights={flights} />}
    </SearchContainer>
  );
};

export default FlightSearch;
