// lib/filterData.ts
export function filterData(
    data: any[], // Les données quotidiennes (ClimateData.daily)
    selectedModels: string[], // Modèles sélectionnés
    startDate: string | null, // Date de début
    endDate: string | null // Date de fin
) {
    let filteredData = data;

    // Filtrage par modèles
    if (selectedModels.length > 0) {
        filteredData = filteredData.filter((item) =>
            selectedModels.includes(item.model) // Supposons que chaque élément a une propriété `model`
        );
    }

    // Filtrage par dates
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        filteredData = filteredData.filter((item) => {
            const itemDate = new Date(item.date); // Supposons que chaque élément a une propriété `date`
            return itemDate >= start && itemDate <= end;
        });
    }

    return filteredData;
}