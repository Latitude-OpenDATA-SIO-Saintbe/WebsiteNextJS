// lib/api.ts
import {CategoryType} from './model/CategoryType'
import {City} from './model/City'
import {useRouter} from 'next/navigation'

export const fetchCategoryTypes = async (): Promise<CategoryType[]> => {
    const res = await fetch('/api/categoriestypes');
    if (!res.ok) throw new Error('Failed to load category types');
    return res.json();
};

export const fetchCities = async (): Promise<City[]> => {
    const res = await fetch('/api/city');
    if (!res.ok) throw new Error('Failed to load cities');
    return res.json();
};

export const fetchMeteoData = async (url: string): Promise<any> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load data');
    return res.json();
};


export const updateURLAndFetchData = (startDate: string, endDate: string, city: string, category: string) => {
    const router = useRouter();
    // Construct the new URL
    let Url = `/?date=${startDate}`;

    // Append endDate if it's set
    if (endDate) {
        Url += `:${endDate}`;
    }

    // Append city if it's set
    if (city) {
        Url += `&city=${city}`;
    }

    // Append category only if both city and category are set
    if (city && category) {
        Url += `&category=${category}`;
    }

    // Update the browser's URL to include the query parameters
    router.push(Url);

    // Fetch data using the newly constructed URL
    const apiUrl = `/api/${startDate}${endDate ? `:${endDate}` : ''}${city ? `/${city}` : ''}${city && category ? `/${category}` : ''}`;
    return data = fetchMeteoData(apiUrl);
};