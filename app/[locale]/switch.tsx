'use client'

import {useChangeLocale} from '../../locales/client';
//import { Switch } from "@/components/ui/switch";

export const experimental_ppr = true;

export function Switch() {
    // Uncomment to preserve the search params. Don't forget to also uncomment the Suspense in the layout
    const changeLocale = useChangeLocale(/* { preserveSearchParams: true } */);

    return (
        <>
        <div>

            {/* <Switch/> */}
            <button type="button" onClick={() => changeLocale('en')}>
                EN
            </button>
            <button type="button" onClick={() => changeLocale('fr')}>
                FR
            </button>
            </div>
        </>
    );
}
