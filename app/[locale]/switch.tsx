'use client'

import {useChangeLocale, useCurrentLocale} from '../../locales/client';
import {Button} from '../../components/ui/button';

export const experimental_ppr = true;

export function SwitchLang({params}: { params: Promise<{ locale: string }> }) {
    const currentLocale = useCurrentLocale();
    const changeLocale = useChangeLocale();  // Assuming it returns the changeLocale function

    // Toggle language function for the switch
    const handleToggle = () => {
        const newLocale = currentLocale === 'en' ? 'fr' : 'en'; // Toggle between 'en' and 'fr'
        changeLocale(newLocale);  // Directly call the function with the new locale
    }

    return (
        <>
            <div>
                {/* Switch between English and French */}
                <Button
                    onClick={handleToggle} // Toggle language when clicked
                >
                    Switch Language
                </Button>
            </div>
        </>
    );
}
