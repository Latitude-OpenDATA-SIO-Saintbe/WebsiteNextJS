import {unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag} from 'next/cache';

export const transformData = async (rawData: any) => {
    "use cache";
    cacheLife('weeks')
    cacheTag(rawData)
    return rawData.time.map((date: string, index: number) => {
        const groupedData: any = {
            date,
            temperature_2m_mean: [
                {model: 'CMCC', value: rawData.temperature_2m_mean_CMCC_CM2_VHR4?.[index] ?? 0},
                {model: 'FGOALS', value: rawData.temperature_2m_mean_FGOALS_f3_H?.[index] ?? 0},
                {model: 'HiRAM', value: rawData.temperature_2m_mean_HiRAM_SIT_HR?.[index] ?? 0},
                {model: 'MRI', value: rawData.temperature_2m_mean_MRI_AGCM3_2_S?.[index] ?? 0},
                {model: 'EC_Earth', value: rawData.temperature_2m_mean_EC_Earth3P_HR?.[index] ?? 0},
                {model: 'MPI', value: rawData.temperature_2m_mean_MPI_ESM1_2_XR?.[index] ?? 0},
                {model: 'NICAM', value: rawData.temperature_2m_mean_NICAM16_8S?.[index] ?? 0},
            ],
            temperature_2m_max: [
                {model: 'CMCC', value: rawData.temperature_2m_max_CMCC_CM2_VHR4?.[index] ?? 0},
                {model: 'FGOALS', value: rawData.temperature_2m_max_FGOALS_f3_H?.[index] ?? 0},
                {model: 'HiRAM', value: rawData.temperature_2m_max_HiRAM_SIT_HR?.[index] ?? 0},
                {model: 'MRI', value: rawData.temperature_2m_max_MRI_AGCM3_2_S?.[index] ?? 0},
                {model: 'EC_Earth', value: rawData.temperature_2m_max_EC_Earth3P_HR?.[index] ?? 0},
                {model: 'MPI', value: rawData.temperature_2m_max_MPI_ESM1_2_XR?.[index] ?? 0},
                {model: 'NICAM', value: rawData.temperature_2m_max_NICAM16_8S?.[index] ?? 0},
            ],
            rain_sum: [
                {model: 'CMCC', value: rawData.rain_sum_CMCC_CM2_VHR4?.[index] ?? 0},
                {model: 'FGOALS', value: rawData.rain_sum_FGOALS_f3_H?.[index] ?? 0},
                {model: 'HiRAM', value: rawData.rain_sum_HiRAM_SIT_HR?.[index] ?? 0},
                {model: 'MRI', value: rawData.rain_sum_MRI_AGCM3_2_S?.[index] ?? 0},
                {model: 'EC_Earth', value: rawData.rain_sum_EC_Earth3P_HR?.[index] ?? 0},
                {model: 'MPI', value: rawData.rain_sum_MPI_ESM1_2_XR?.[index] ?? 0},
                {model: 'NICAM', value: rawData.rain_sum_NICAM16_8S?.[index] ?? 0},
            ],
        };

        return groupedData;
    });
};
