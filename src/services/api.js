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
        
        return await response.json();
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
        // Fallback to mock data in case of error for development
        if (process.env.NODE_ENV === 'development') {
            console.warn('Using mock seat data due to API error');
            return getMockSeats();
        }
        throw error;
    }
}

export async function bookFlight(bookingData) {
    try {
        const response = await fetch(`${API_BASE_URL}/flights/${bookingData.flightId}/book`, {
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
    return [
        {
            id: 1,
            airline: 'AirBaltic',
            origin: 'Riga',
            destination: 'Paris',
            departureTime: '2025-03-17T09:30:00',
            arrivalTime: '2025-03-17T11:45:00',
            price: 199.99
        },
        {
            id: 2,
            airline: 'Lufthansa',
            origin: 'Riga',
            destination: 'Paris',
            departureTime: '2025-03-17T13:15:00',
            arrivalTime: '2025-03-17T15:30:00',
            price: 249.99
        },
        {
            id: 3,
            airline: 'Air France',
            origin: 'Riga',
            destination: 'Paris',
            departureTime: '2025-03-17T18:00:00',
            arrivalTime: '2025-03-17T20:15:00',
            price: 279.99
        }
    ];
}

function getMockSeats() {
    const seats = [];
    // Generate 6 rows of 6 seats each
    for (let row = 1; row <= 6; row++) {
        for (let col of ['A', 'B', 'C', 'D', 'E', 'F']) {
            const seatId = seats.length + 1;
            seats.push({
                id: seatId,
                seatNumber: `${row}${col}`,
                booked: Math.random() > 0.7, // ~30% of seats are booked
                price: 10 + Math.floor(Math.random() * 20) // Price between 10-30
            });
        }
    }
    return seats;
}