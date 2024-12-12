export const experimental_ppr = true
import Api from './Api';
import { Suspense } from 'react';

// app/[locale]/test/page.tsx

export default async function Page(props: any) {
    "use cache"
    const searchParams = await props.searchParams;
    // Access the searchParams object and handle missing values
    const { date = '', city = '', category = '' } = searchParams;

    return (
        <div>
            <h1>Search Results</h1>
            <p>Date: {date}</p>
            <p>City: {city}</p>
            <p>Category: {category}</p>
            {/* Suspense is used for lazy loading Api component */}
            <Suspense fallback={<div>Loading API Data...</div>}>
                {/* Passing 'searchParams' directly to Api component */}
                <Api searchParams={{ date, city, category }} />
            </Suspense>
        </div>
    );
}
