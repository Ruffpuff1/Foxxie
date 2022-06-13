import useLocale from '../../hooks/useLocale';

export default function HomeName() {
    const [translations] = useLocale();

    return (
        <div className='flex h-full flex-col items-center justify-center duration-500 md:items-start'>
            <h2 className='hidden px-12 font-semibold md:block md:text-2xl'>{translations.home.hi}</h2>
            <h2 className='space-x-2 px-12 text-4xl font-bold md:text-6xl'>
                <span className='duration-500'>Reese</span>
                <span className='bg-gradient-to-r bg-clip-text duration-500 hover:cursor-pointer hover:from-[#09896E] hover:to-blue-500 hover:text-transparent'>
                    Harlak
                </span>
            </h2>
        </div>
    );
}
