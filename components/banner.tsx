import {Skeleton} from './ui/skeleton';
import {Suspense} from 'react';
import {ModeToggle} from './modeToggle';

export default async function Banner({text}: { text: string }) {
    return (
        <div
            className='text-black bg-[#FFD700] py-2 px-5 flex flex-row justify-between content-center font-bold text-xl rounded-s-sm'>
            {text}
            <Suspense fallback={<Skeleton/>}>
                <ModeToggle/>
            </Suspense>
        </div>
    );
}
