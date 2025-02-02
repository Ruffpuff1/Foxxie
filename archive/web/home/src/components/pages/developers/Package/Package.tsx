import { Translations } from '@assets/locales/types';
import Body from '@developers/Body/Body';
import Book, { Booklink } from '@developers/Book/Book';
import Header from '@developers/Header';
import Main from '@developers/Main/Main';
import PageList, { ListItem } from '@developers/PageList/PageList';
import Preview, { Box } from '@developers/Preview/Preview';
import Subsection from '@developers/Subsection';
import BreadCrumbs, { Crumb } from '@ui/BreadCrumbs/BreadCrumbs';
import { FuzzySearch } from '@util/FuzzySearch';
import { MapEntry } from '@util/utils';
import { ReactNode } from 'react';

export default function Package({ book, boxes, search, children, crumbs, description, header, pageList }: Props) {
    return (
        <Main>
            <Book search={search} links={book} />

            <Body>
                <div className='mt-16 mb-5 bg-white text-[16px] 2xl:w-[85%]'>
                    <BreadCrumbs crumbs={crumbs} />

                    <article className='border-b p-[40px] shadow-sm'>
                        <Header>{header}</Header>

                        <PageList className='top-[8rem] 2xl:fixed 2xl:right-28' items={pageList} />

                        <Subsection id='introduction'>
                            <p className='my-[16px]'>{description}</p>
                        </Subsection>

                        {children}
                    </article>

                    <Preview boxes={boxes} />
                </div>
            </Body>
        </Main>
    );
}

interface Props {
    book: Booklink[];
    boxes: Box[];
    children: ReactNode;
    search: FuzzySearch<string, MapEntry>;
    crumbs: (translations: Translations) => Crumb[];
    description: string;
    header: string;
    pageList: ListItem[];
}
