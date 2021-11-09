import { API } from 'API';
import { LanguageResponse, PoemResponse, SearchType } from 'API/types';
import PoemCard from 'Components/PoemCard';
import SearchBar from 'Components/SearchBar';
import TranslateModal from 'Components/TranslateModal';
import usePlayAudio from 'Hooks/usePlayAudio';
import usePoems from 'Hooks/usePoems';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Container, InnerContainer } from 'Styles/containers';
import * as styles from 'Styles/pageStyles/Home.styles';

interface HomeProps {
  randomPoems: PoemResponse[];
  languages: LanguageResponse[];
}

const Home: NextPage<HomeProps> = ({ randomPoems, languages }) => {
  const [type, setType] = useState<SearchType>(SearchType.TITLE);
  const [searchTerm, setSearchTerm] = useState('');
  const [translatePoem, setTranslatePoem] = useState<PoemResponse | null>(null);

  const { poems, loading } = usePoems(type, searchTerm);
  const { playAudio } = usePlayAudio();

  const handleSearch = (_type: SearchType, _searchTerm: string): void => {
    setType(_type);
    setSearchTerm(_searchTerm);
  };

  const handleClose = (): void => {
    setTranslatePoem(null);
  };

  return (
    <Container>
      <Head>
        <title>Poetry TransReader</title>
        <meta name="description" content="Poetry translator-and-reader!" />
      </Head>

      <styles.HeaderRow>
        <styles.Heading>Poetry TransReader</styles.Heading>
        <SearchBar onSearch={handleSearch} />
      </styles.HeaderRow>

      {loading ? (
        <styles.Heading>Loading....</styles.Heading>
      ) : (
        <InnerContainer>
          {
            // Render randomPoems first, then poems after a search has been made
            (poems.length ? poems : randomPoems).map((poem, i) => (
              <PoemCard
                key={poem.title}
                poem={poem}
                index={i}
                onPlay={playAudio}
                onTranslate={setTranslatePoem}
              />
            ))
          }
        </InnerContainer>
      )}

      {translatePoem && (
        <TranslateModal
          isOpen={translatePoem !== null}
          onClose={handleClose}
          poem={translatePoem}
          languages={languages}
          onPlay={playAudio}
        />
      )}
    </Container>
  );
};

Home.getInitialProps = async () => {
  const [randomPoems, languages] = await Promise.all([
    API.poems.random(20),
    API.google.supportedLanguages()
  ]);
  return { randomPoems, languages };
};

export default Home;
