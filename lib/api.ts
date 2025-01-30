"use server"

import {unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag} from 'next/cache';
import {City} from './model/City';
import {CityPosition} from './model/CityPosition';
import {Login} from "./model/Login";

let token: Login | null = null;
const email = process.env.API_EMAIL;
const password = process.env.API_PASSWORD;
const url = process.env.API_URL;


// Authentication function
const authLogin = async (): Promise<Login> => {
    try {
        console.log(`${url}/auth/login`);
        const res = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to login');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching login data:', error);
        throw error;
    }
};

// Helper function to check if token is expired
const isTokenExpired = (expiration: string): boolean => {
    const tokenExpirationDate = new Date(expiration);
    return Date.now() > tokenExpirationDate.getTime();
};

// Helper function to ensure valid token
export const ensureValidToken = async (): Promise<void> => {
    if (token == null || isTokenExpired(token.expiration)) {
        console.log('Token expired, refreshing...');
        token = await authLogin(); // Refresh token
    }
};



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

// Fetch category types
export const fetchCategoryTypes = async (): Promise<any> => {
    "use cache";
    cacheLife('days');
    try {
        await ensureValidToken(); // Ensure the token is valid before making the request

        const res = await fetch(`${url}/Weather/categoriestypes`, {
            headers: {
                'Authorization': `Bearer ${token?.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to load category types');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching category types:', error);
        throw error;
    }
};

// Fetch meteo data with cache tagging
export const fetchMeteoData = async (apiUrl: string): Promise<any> => {
    "use cache";
    cacheLife('hours');
    cacheTag(`metheo-${apiUrl}`); // Tagging with the API URL to optimize caching
    try {
        await ensureValidToken(); // Ensure the token is valid before making the request
        const res = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token?.token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            throw new Error('Failed to load meteo data');
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching meteo data:', error);
        throw error;
    }
};

// Update URL and fetch data with new parameters
export const updateURLAndFetchData = async (params:any) => {
    // Construct the URL with the new parameters
    if (params.dataType === 'climate' && params.startDate && params.endDate && params.latitude && params.longitude && params.selectedModels && params.selectedCategoryTypes) {
        const apiUrl = `https://climate-api.open-meteo.com/v1/climate?latitude=${params.latitude}&longitude=${params.longitude}&start_date=${params.startDate}&end_date=${params.endDate}&models=${params.selectedModels}&daily=${params.selectedCategoryTypes}`;
        try {
            // Fetch data using the newly constructed URL
            return await fetchClimateData(apiUrl);
        } catch (error) {
            console.error('Error updating URL and fetching data:', error);
            throw error;
        }
    }
    if (params.dataType === 'airQuality' && params.startDate && params.endDate && params.latitude && params.longitude && params.selectedCategoryTypes) {
        const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${params.latitude}&longitude=${params.longitude}&start_date=${params.startDate}&end_date=${params.endDate}&hourly=${params.selectedCategoryTypes}`;
        try {
            // Fetch data using the newly constructed URL
            return await fetchClimateData(apiUrl);
        } catch (error) {
            console.error('Error updating URL and fetching data:', error);
            throw error;
        }
    }
    if (params.dataType === 'flood' && params.startDate && params.endDate && params.latitude && params.longitude && params.selectedCategoryTypes) {
        const apiUrl = `https://flood-api.open-meteo.com/v1/flood?latitude=${params.latitude}&longitude=${params.longitude}&start_date=${params.startDate}&end_date=${params.endDate}&daily=${params.selectedCategoryTypes}`;
        try {
            // Fetch data using the newly constructed URL
            return await fetchClimateData(apiUrl);
        } catch (error) {
            console.error('Error updating URL and fetching data:', error);
            throw error;
        }
    }
    if (params.dataType === 'weather' && params.selectedCategoryTypes && params.startDate && params.endDate && params.latitude && params.longitude) {
        const apiUrl = `${url}/Weather/search/${params.dataType}/${params.startDate}:${params.endDate}/${params.latitude}/${params.longitude}/${params.selectedCategoryTypes}`;
        try {
            // Fetch data using the newly constructed URL
            return await fetchMeteoData(apiUrl);
        } catch (error) {
            console.error('Error updating URL and fetching data:', error);
            throw error;
        }
    }
    return null;
};

export const fetchClimateData = async (apiUrl: string): Promise<any> => {
    "use cache";
    cacheLife('weeks');
    try {
        console.log(apiUrl);
        const res = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error('Failed to load climate data');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching climate data:', error);
        throw error;
    }
}