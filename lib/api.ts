import {City} from './model/City';
import {CityPosition} from './model/CityPosition';
import {ensureValidToken, token, url} from './login.api';

// Fetch cities
export const fetchCities = async (city: string | string[]): Promise<CityPosition[]> => {
    try {
        await ensureValidToken(); // Ensure the token is valid before making the request

        const res = await fetch(`${url}/Weather/city/${city}`, {
            headers: {
                'Authorization': `Bearer ${token?.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to load city');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching city:', error);
        throw error;
    }
};

// Search cities
export const searchCities = async (city: string): Promise<City[]> => {
    try {
        await ensureValidToken(); // Ensure the token is valid before making the request

        const res = await fetch(`${url}/Weather/search/${city}`, {
            headers: {
                'Authorization': `Bearer ${token?.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to search city');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching citySearch:', error);
        throw error;
    }
};