// lib/api.ts
import {City} from './model/City'
import {Login} from './model/Login'
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache';


let token: Login | null = null;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const url = process.env.API_URL;

// Ensure that email and password are available
if (!email || !password) {
    throw new Error('Missing email or password in environment variables');
}

// Ensure that api url is available
if (!url) {
    throw new Error('Missing Url Api in environment variables');
}

const authLogin = async (): Promise<Login> => {
    try {
        const res = await fetch(`${url}/auth/login`, {
            method: 'POST',  // Use POST method
            headers: {
                'Accept': '*/*',  // Accept any response type
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,  // Send the email and password in the request body
                password: password,
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to login');
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching login data:', error);
        throw error;
    }
}

// Helper function to check if token is expired
const isTokenExpired = (expiration: string): boolean => {
    const tokenExpirationDate = new Date(expiration);
    return Date.now() > tokenExpirationDate.getTime();
};

// Fetch category types and refresh token if expired
export const fetchCategoryTypes = async (): Promise<any> => {
    'use cache'
    cacheLife("days")
    try {
        // Check if token is expired, refresh if necessary
        if (token == null || isTokenExpired(token.expiration)) {
            console.log('Token expired, refreshing...');
            token = await authLogin(); // Refresh token
        }

        // Proceed with fetch if token is valid
        const res = await fetch(`${url}/categoriestypes`, {
            headers: {
                'Authorization': `Bearer ${token?.token}`, // Send token in the Authorization header
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to load category types');
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching category types:', error);
        throw error;
    }
};

export const fetchCities = async (): Promise<City[]> => {
    'use cache'
    cacheLife("days")
    try {
        // Check if token is expired, refresh if necessary
        if (token == null || isTokenExpired(token.expiration)) {
            console.log('Token expired, refreshing...');
            token = await authLogin(); // Refresh token
        }

        // Proceed with fetch if token is valid
        const res = await fetch(`${url}/city`, {
            headers: {
                'Authorization': `Bearer ${token?.token}`, // Send token in the Authorization header
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to load city');
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching city:', error);
        throw error;
    }
};

export const fetchMeteoData = async (url: string): Promise<any> => {
    'use cache'
    cacheLife("hours")
    cacheTag(`metheo-${URL}`)
    try {
        // Check if token is expired, refresh if necessary
        if (token == null || isTokenExpired(token.expiration)) {
            console.log('Token expired, refreshing...');
            token = await authLogin(); // Refresh token
        }

        // Proceed with fetch if token is valid
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token?.token}`, // Send token in the Authorization header
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to load metheo');
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching metheo:', error);
        throw error;
    }
};


export const updateURLAndFetchData = (date: string, city: string, category: string) => {
    // Construct the new URL
    let Url = `/?date=${date}`;


    // Append city if it's set
    if (city) {
        Url += `&city=${city}`;
    }

    // Append category only if both city and category are set
    if (city && category) {
        Url += `&category=${category}`;
    }

    // Fetch data using the newly constructed URL
    const apiUrl = `${url}/${date}${city ? `/${city}` : ''}${city && category ? `/${category}` : ''}`;
    return fetchMeteoData(apiUrl);
};
