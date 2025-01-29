"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./card";
import * as React from "react";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {fetchCities, searchCities} from "../../lib/api";

interface SelectProps {
    initialSelectedModels: string[];
    initialStartDate: string | null;
    initialEndDate: string | null;
    initialSelectedCategoryTypes: string[];
    CategoryTypes: string[];
    models: string[];
    timePeriods: string[];
}

export default function Select({
                                   initialSelectedModels,
                                   initialStartDate,
                                   initialEndDate,
                                   initialSelectedCategoryTypes,
                                   CategoryTypes,
                                   models,
                                   timePeriods,
                               }: SelectProps) {
    const [selectedModels, setSelectedModels] = useState<string[]>(initialSelectedModels || []);
    const [startDate, setStartDate] = useState<string | null>(initialStartDate);
    const [endDate, setEndDate] = useState<string | null>(initialEndDate);
    const [selectedCategoryTypes, setSelectedCategoryTypes] = useState<string[]>(initialSelectedCategoryTypes || []);
    const [cityInput, setCityInput] = useState<string>("");
    const [cityResults, setCityResults] = useState<{ id: number; name: string }[]>([]);
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams();

        if (selectedModels.length > 0) {
            params.set("selectedModels", selectedModels.join(","));
        }

        if (selectedCategoryTypes.length > 0) {
            params.set("selectedCategoryTypes", selectedCategoryTypes.join(","));
        }

        if (startDate) {
            params.set("startDate", startDate);
        }

        if (endDate) {
            params.set("endDate", endDate);
        }

        router.push(`?${params.toString()}`);
    }, [selectedModels, startDate, endDate, router, selectedCategoryTypes]);

    const handleModelChange = (model: string) => {
        const newSelectedModels = selectedModels.includes(model)
            ? selectedModels.filter((m) => m !== model)
            : [...selectedModels, model];
        setSelectedModels(newSelectedModels);
    };

    const handleCityInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCityInput(value);
        if (value.length > 0) {
            const results = await searchCities(value);
            setCityResults(results);
        } else {
            setCityResults([]);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Select Weather Data</CardTitle>
                    <CardDescription>Select Params</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <form className="flex gap-4 mb-4">
                    {models && models.length > 0 && (
                        <div>
                            <span className="font-semibold">Select Models:</span>
                            <div className="flex gap-4 flex-wrap">
                                {models.map((model, index) => (
                                    <label key={index} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="selectedModels"
                                            value={model}
                                            checked={selectedModels.includes(model)}
                                            onChange={() => handleModelChange(model)}
                                        />
                                        {model}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    {CategoryTypes && CategoryTypes.length > 0 && (
                        <div>
                            <span className="font-semibold">Select Category Types:</span>
                            <div className="flex gap-4 flex-wrap">
                                {CategoryTypes.map((category, index) => (
                                    <label key={index} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="selectedCategoryTypes"
                                            value={category}
                                            checked={selectedCategoryTypes.includes(category)}
                                            onChange={() => setSelectedCategoryTypes((prev) => {
                                                return prev.includes(category)
                                                    ? prev.filter((item) => item !== category)
                                                    : [...prev, category];
                                            })}
                                        />
                                        {category}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Enter city"
                            value={cityInput}
                            onChange={handleCityInputChange}
                        />
                        {cityResults.length > 0 && (
                            <ul className="border border-gray-300 rounded-md shadow-md">
                                {cityResults.map((city) => (
                                    <li key={city.id} className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={async () => {
                                            const cityData = await fetchCities(city.name);
                                            if (cityData && cityData.latitude && cityData.longitude) {
                                                router.push(`?latitude=${cityData.latitude}&longitude=${cityData.longitude}`);
                                            }
                                        }}>
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="date"
                            name="startDate"
                            value={startDate || ""}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            name="endDate"
                            value={endDate || ""}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </form>

                <div className="mt-4">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Start Date:</span> {startDate || "Not selected"}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">End Date:</span> {endDate || "Not selected"}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}