import {Login} from "./model/Login";

export let token: Login | null = null;
const email = process.env.API_EMAIL;
const password = process.env.API_PASSWORD;
export const url = process.env.API_URL;

// Ensure that email and password are available
if (!email || !password) {
    throw new Error('Missing email or password in environment variables');
}

// Ensure that api url is available
if (!url) {
    throw new Error('Missing API URL in environment variables');
}

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
