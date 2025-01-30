import { NextRequest, NextResponse } from 'next/server';
import { fetchCities as fetchCitiesFromServer, searchCities as searchCitiesFromServer, ensureValidToken } from '@/lib/api';

// API handler to fetch cities
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url); // Get query parameters
    const city = searchParams.get('city');
    const action = searchParams.get('action');

    try {
        await ensureValidToken(); // Ensure the token is valid before proceeding

        let data;

        if (action === 'search') {
            if (typeof city !== 'string') throw new Error('City query should be a string');
            data = await searchCitiesFromServer(city); // Call server-side function for searching cities
        } else if (action === 'fetch') {
            if (typeof city !== 'string') throw new Error('City query should be a string');
            data = await fetchCitiesFromServer(city); // Call server-side function for fetching cities
        } else {
            throw new Error('Invalid action');
        }

        return NextResponse.json(data); // Send back the data to the client
    } catch (error) {
        console.error('Error handling cities request:', error);
        return NextResponse.json({ error: 'Error fetching cities data' }, { status: 500 });
    }
}
