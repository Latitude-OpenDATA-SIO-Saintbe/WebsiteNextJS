import { fetchCategoryTypes, fetchCities, updateURLAndFetchData } from '../../../lib/api';

interface ApiProps {
  searchParams: {
    date: string;
    city: string;
    category: string;
  };
}

export default async function Api({ searchParams }: ApiProps) {
  "use cache"

  // Destructure searchParams directly in Api
  const { date = '', city = '', category = '' } = searchParams;

  // Fetch category types and cities
  const categoryTypes = await fetchCategoryTypes();
  const cities = await fetchCities();

  let updatedData = null;

  console.log(date);
  console.log(city);
  console.log(category);

  // Conditionally fetch updated data if 'date' exists
  if (date) {
    updatedData = await updateURLAndFetchData(date, city, category);
  }

  return (
    <div>
      <h1>API Data</h1>
      <h2>Search Parameters:</h2>
      <p>Date: {date}</p>
      <p>City: {city}</p>
      <p>Category: {category}</p>

      <h2>Category Types:</h2>
      <ul>
        {categoryTypes?.map((category: any, index: number) => (
          <li key={index}>{category}</li>
        ))}
      </ul>

      <h2>Cities:</h2>
      <ul>
        {cities?.map((city: any, index: number) => (
          <li key={index}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
}
