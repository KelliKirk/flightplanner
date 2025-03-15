const API_BASE_URL = 'http://localhost:8081/api'; 

// Helper function to check if server is reachable
export async function checkServerConnection() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`${API_BASE_URL}/health`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        console.error('Server connection check failed:', error);
        return false;
    }
}

export async function fetchFlights(filters = {}) {
    try {
        // Build query string from filters
        const queryParams = new URLSearchParams();
        
        if (filters.origin) queryParams.append('origin', filters.origin);
        if (filters.destination) queryParams.append('destination', filters.destination);
        if (filters.departureDate) queryParams.append('departureDate', filters.departureDate);
        if (filters.passengers) queryParams.append('passengers', filters.passengers);
        
        const queryString = queryParams.toString();
        const url = `${API_BASE_URL}/flights${queryString ? `?${queryString}` : ''}`;
        
        console.log('Fetching flights from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Network error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Format dates properly for each flight
        return data.map(flight => ({
            ...flight,
            departureTime: flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'Not available',
            arrivalTime: flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : 'Not available'
        }));
    } catch (error) {
        console.error('API error:', error);
        // Fallback to mock data in case of error for development
        if (process.env.NODE_ENV === 'development') {
            console.warn('Using mock flight data due to API error');
            return getMockFlights();
        }
        throw error;
    }
}

export async function getSeatsForFlight(flightId) {
    try {
        console.log(`Fetching seats for flight ${flightId}`);
        const response = await fetch(`${API_BASE_URL}/flights/${flightId}/seats`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Network error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

export async function bookFlight(bookingData) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Booking failed: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

// Mock data for testing when backend is unavailable
function getMockFlights() {
    const flights = [
        {
            id: 1,
            airline: 'AirBaltic',
            origin: 'Tallinn',
            destination: 'London',
            departureTime: '2025-03-17T09:30:00',
            arrivalTime: '2025-03-17T11:45:00',
            price: 150
        },
        {
            id: 2,
            airline: 'Finnair',
            origin: 'London',
            destination: 'Tallinn',
            departureTime: '2025-03-17T13:15:00',
            arrivalTime: '2025-03-17T15:30:00',
            price: 145
        },
        {
            id: 3,
            airline: 'Lufthansa',
            origin: 'Tallinn',
            destination: 'Paris',
            departureTime: '2025-03-17T18:00:00',
            arrivalTime: '2025-03-17T20:15:00',
            price: 180
        }
    ];
    
    return flights.map(flight => ({
        ...flight,
        departureTime: new Date(flight.departureTime).toLocaleString(),
        arrivalTime: new Date(flight.arrivalTime).toLocaleString()
    }));
}