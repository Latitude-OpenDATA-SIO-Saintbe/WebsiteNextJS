import {unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag} from 'next/cache';
import {ensureValidToken, token, url} from './login.api';

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
export const updateURLAndFetchData = async (date: string, city: string, category: string) => {
    // Construct the new URL with URLSearchParams
    const params = new URLSearchParams({date});
    if (city) {
        params.append('city', city);
    }

    if (category) {
        params.append('category', category);
    }

    const apiUrl = `${url}/Weather/search/?${params.toString()}`;

    try {
        // Fetch data using the newly constructed URL
        return await fetchMeteoData(apiUrl);
    } catch (error) {
        console.error('Error updating URL and fetching data:', error);
        throw error;
    }
};

export const fetchClimateData = async (): Promise<any> => {
    "use cache";
    cacheLife('weeks');
    try {
        const res = await fetch(`https://climate-api.open-meteo.com/v1/climate?latitude=52.52&longitude=13.41&start_date=2023-01-01&end_date=2024-12-31&models=CMCC_CM2_VHR4,FGOALS_f3_H,HiRAM_SIT_HR,MRI_AGCM3_2_S,EC_Earth3P_HR,MPI_ESM1_2_XR,NICAM16_8S&daily=temperature_2m_mean,temperature_2m_max,rain_sum`);

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