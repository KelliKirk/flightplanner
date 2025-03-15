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

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '', 
    passengers: 1
  });

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const flightsData = await fetchFlights(filters);
      setFlights(flightsData);
    } catch (err) {
      setError('NetworkError when attempting to fetch resource.');
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
          options={['Tallinn', 'Riga', 'Helsinki', 'Vilnius']} 
        />
        
        <SearchFilter 
          name="destination" 
          label="To" 
          value={filters.destination} 
          onChange={handleFilterChange}
          options={['London', 'Paris', 'Berlin', 'New York']} 
        />
        
        <SearchFilter 
          name="departureDate" 
          label="Departure date" 
          value={filters.departureDate} 
          onChange={handleFilterChange}
          type="date" 
        />
        
        <SearchFilter 
          name="passengers" 
          label="Passengers" 
          value={filters.passengers} 
          onChange={handleFilterChange}
          type="number" 
          min="1"
        />
        
        <Button primary onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search flights'}
        </Button>
      </Flex>
      
      {error && <ErrorMessage message={error} />}
      
      {flights.length > 0 && <FlightTable flights={flights} />}
    </SearchContainer>
  );
};

export default FlightSearch;