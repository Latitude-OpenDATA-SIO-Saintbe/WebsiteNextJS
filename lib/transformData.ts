export function transformHourlyData(rawData) {
    const { time, ...models } = rawData.hourly;

    return time.map((timestamp, index) => {
        const entry = { date: timestamp };

        Object.keys(models).forEach((model) => {
            entry[model] = [{ model, value: models[model]?.[index] ?? null }];
        });

        return entry;
    });
}

export function transformClimateData(rawData: RawData) {
    const { time, ...models } = rawData.daily;

    return time.map((timestamp, index) => {
        const entry: { [key: string]: any } = { date: timestamp };

        Object.keys(models).forEach((variable) => {
            if (Array.isArray(models[variable]) && models[variable][index] !== undefined) {
                const modelSuffixes = [
                    'CMCC_CM2_VHR4',
                    'FGOALS_f3_H',
                    'HiRAM_SIT_HR',
                    'MRI_AGCM3_2_S',
                    'EC_Earth3P_HR',
                    'MPI_ESM1_2_XR',
                    'NICAM16_8S'
                ];

                let model = '';
                modelSuffixes.forEach((suffix) => {
                    if (variable.endsWith(suffix)) {
                        model = suffix;
                        variable = variable.replace(`_${suffix}`, '');
                    }
                });

                if (!entry[variable]) {
                    entry[variable] = [];
                }

                entry[variable].push({
                    model: model,
                    value: models[variable][index] ?? null
                });
            }
        });

        return entry;
    });
}

export function transformDailyData(rawData) {
    const { time, ...models } = rawData.daily;

    return time.map((timestamp, index) => {
        const entry = { date: timestamp };

        Object.keys(models).forEach((model) => {
            entry[model] = [{ model, value: models[model]?.[index] ?? null }];
        });

        return entry;
    });
}