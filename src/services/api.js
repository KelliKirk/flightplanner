const API_BASE_URL = 'http://localhost:8081'; 
export async function fetchFlights() {
    try {
        const response = await fetch(`${API_BASE_URL}/flights`);
        if (!response.ok) {
            throw new Error('Võrgu viga: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('API viga:', error);
        throw error;
    }
}

export async function getSeatsForFlight(flightId) {
    const response = await fetch(`${API_BASE_URL}/flights/${flightId}/seats`);
    if (!response.ok) {
        throw new Error('Võrgu viga: ' + response.statusText);
    }
    return await response.json();
}

export async function bookFlight(flightId, seatNumber, passengerName) {
    const response = await fetch(`${API_BASE_URL}/flights/${flightId}/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ seatNumber, passengerName })
    });

    if (!response.ok) {
        throw new Error('Broneerimine ebaõnnestus: ' + response.statusText);
    }

    return await response.json();
}