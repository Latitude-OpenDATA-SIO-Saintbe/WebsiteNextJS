export const experimental_ppr = true
import type {ReactNode} from 'react';
import {I18nProviderClient} from '../../locales/client';

type ProviderProps = {
    locale: string;
    children: ReactNode;
};

export function Provider({locale, children}: ProviderProps) {
    'use client'
    return (
        <I18nProviderClient locale={locale} fallback={<p>Loading...</p>}>
            {children}
        </I18nProviderClient>
    );
}
