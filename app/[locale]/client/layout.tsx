
export const experimental_ppr = true
import type {ReactNode} from 'react';
import {Provider} from '../provider';

export default async function Layout(props: { params: Promise<{ locale: string }>; children: ReactNode }) {
    "use server"
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    return <Provider locale={locale}>{children}</Provider>;
}
