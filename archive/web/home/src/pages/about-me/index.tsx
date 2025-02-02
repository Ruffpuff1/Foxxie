import Article from '@about-me/Article';
import Header from '@about-me/Header/Header';
import Main from '@home/Main';
import useLocale from '@hooks/useLocale';
import Meta from '@ui/Meta';
import type { NextPage } from 'next';

const AboutMe: NextPage = () => {
    const [{ aboutMe }] = useLocale();

    return (
        <>
            <Meta
                title={aboutMe.title}
                description={aboutMe.description}
                keywords={['reese', 'reese harlak', 'web', 'react', 'next.js', 'developer', 'student', 'music']}
                subject='About Reese Harlak'
            />

            <Main>
                <Header />
                <Article />
            </Main>
        </>
    );
};

export default AboutMe;
