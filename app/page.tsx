"use server";

import { Suspense } from "react";
import Select from "@/components/ui/Select";
import { fetchCategoryTypes, updateURLAndFetchData } from "@/lib/api";
import {
    transformClimateData,
    transformHourlyData,
    transformDailyData
} from "@/lib/transformData";
import { Skeleton } from "@/components/ui/skeleton";
import ViewToggle from "@/components/ui/ViewToggle";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
    const params = await searchParams;

    const startDate = params.startDate || null;
    const endDate = params.endDate || null;

    try {
        let ClimateDataTransformed = [];
        let dataRecord = {};
        const ClimateData = await updateURLAndFetchData(params);
        const fetchCategoryTypesData = await fetchCategoryTypes();
        if (ClimateData != null) {
            if (params.dataType === 'climate' || params.dataType === 'flood') {
                if (params.dataType === 'climate') {
                    ClimateDataTransformed = await transformClimateData(ClimateData);
                    console.log(ClimateDataTransformed);
                } else {
                    ClimateDataTransformed = await transformDailyData(ClimateData);
                }
                
                // Check if the first element of ClimateData.daily is an array
                // If it is, reduce the array to a single object where each key contains an array of all values for that key
                // Otherwise, use ClimateData.daily as is
                dataRecord = ClimateData.daily[0] instanceof Array
                    ? ClimateData.daily.reduce((acc: any, item: any) => {
                        Object.keys(item).forEach((key) => {
                            if (!acc[key]) acc[key] = [];
                            acc[key].push(...item[key]);
                        });
                        return acc;
                    }, {} as Record<string, any[]>)
                    : ClimateData.daily;
            } else {
                ClimateDataTransformed = await transformHourlyData(ClimateData);

                // Check if the first element of ClimateData.hourly is an array
                // If it is, reduce the array to a single object where each key contains an array of all values for that key
                // Otherwise, use ClimateData.hourly as is
                dataRecord = ClimateData.hourly[0] instanceof Array
                    ? ClimateData.hourly.reduce((acc: any, item: any) => {
                        Object.keys(item).forEach((key) => {
                            if (!acc[key]) acc[key] = [];
                            acc[key].push(...item[key]);
                        });
                        return acc;
                    }, {} as Record<string, any[]>)
                    : ClimateData.hourly;
            }
        }
        
        // transform selectedCategoryTypes and selectedModels to a list from pressure_msl_mean,dew_point_2m_max,relative_humidity_2m_min to [ 'pressure_msl_mean', 'dew_point_2m_max', 'relative_humidity_2m_min' ]
        const selectedCategoryTypes = params.selectedCategoryTypes ? params.selectedCategoryTypes.split(',') : [];
        const selectedModels = params.selectedModels ? params.selectedModels.split(',') : [];

        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Suspense fallback={<Skeleton />}>
                    {/* Pass the transformed data to the ViewToggle component if not null */}
                    {
                        ClimateDataTransformed.length > 0 && <ViewToggle chartData={ClimateDataTransformed} dataRecord={dataRecord} dataType={params.dataType}/>
                    }
                    <Select
                        initialDataType={params.dataType as string}
                        initialStartDate={startDate}
                        initialEndDate={endDate}
                        initialSelectedModels={selectedModels}
                        initialSelectedCategoryTypes={selectedCategoryTypes}
                        initialLatitude={params.latitude as string}
                        initialLongitude={params.longitude as string}
                        CategoryTypes={fetchCategoryTypesData}
                    />
                </Suspense>
            </div>
        );
    } catch (error) {
        console.error("Error fetching or transforming data:", error);
        return <div className="text-red-500 bg-red-100 p-4 rounded">Error loading data</div>;
    }
}