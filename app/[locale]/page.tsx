"use server";

import {Suspense} from "react";
import Select from "../../components/ui/Select";
import {ChartCanvas} from "../../components/ui/ChartCanvas";
import {DataTable} from "../../components/ui/DataTable";
import {fetchCategoryTypes, fetchClimateData} from "../../lib/api.server";
import {transformData} from "../../lib/transformData";
import {Skeleton} from "../../components/ui/skeleton";

export default async function Page({searchParams}: { searchParams: { [key: string]: string | string[] } }) {
    const params = await searchParams;

    const startDate = params.startDate || null;
    const endDate = params.endDate || null;

    try {
        const ClimateData = await fetchClimateData();
        const fetchCategoryTypesData = await fetchCategoryTypes();
        const ClimateDataTransformed = await transformData(ClimateData.daily);

        const dataRecord = ClimateData.daily[0] instanceof Array
            ? ClimateData.daily.reduce((acc: any, item: any) => {
                Object.keys(item).forEach((key) => {
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(...item[key]);
                });
                return acc;
            }, {} as Record<string, any[]>)
            : ClimateData.daily;

        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Suspense fallback={<Skeleton/>}>
                    <ChartCanvas chartData={ClimateDataTransformed}/>
                    <DataTable
                        data={dataRecord}
                        itemsPerPage={2}
                    />
                    <Select
                        initialStartDate={startDate}
                        initialEndDate={endDate}
                        initialSelectedModels={params.selectedModels as string[]}
                        initialSelectedCategoryTypes={params.selectedCategoryTypes as string[]}
                        CategoryTypes={fetchCategoryTypesData}
                        models={ClimateData.models}
                        timePeriods={ClimateData.timePeriods}
                    />
                </Suspense>
            </div>
        );
    } catch (error) {
        console.error("Error fetching or transforming data:", error);
        return <div>Error loading data</div>;
    }
}