// lib/useSearchParamsUtil.ts
import {useSearchParams} from 'next/navigation';

const useSearchParamsUtil = () => {
    const searchParams = useSearchParams();

    const getSearchParams = () => {
        const date = searchParams.get('date') || '';
        const city = searchParams.get('city') || '';
        const category = searchParams.get('category') || '';

        return {date, city, category};
    };

    return {getSearchParams};
};

export default useSearchParamsUtil;
