import { API } from "API";
import { PoemResponse, SearchType } from "API/types";
import PoemCard from "Components/PoemCard";
import SearchBar from "Components/SearchBar";
import { usePoems } from "Hooks/usePoems";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { Container, InnerContainer } from "Styles/containers";
import * as styles from "./styles";

interface HomeProps {
  randomPoems: PoemResponse[];
}

const Home: NextPage<HomeProps> = ({ randomPoems }) => {
  const [type, setType] = useState<SearchType>(SearchType.TITLE);
  const [searchTerm, setSearchTerm] = useState("");
  const { poems, loading } = usePoems(type, searchTerm);

  const [isPlaying, setIsPlaying] = useState(false);

  const audioContext = useRef<AudioContext | null>(null);
  const audioSource = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    audioContext.current = new AudioContext();
  }, []);

  const handleSearch = (type: SearchType, searchTerm: string): void => {
    setType(type);
    setSearchTerm(searchTerm);
  };

  const handlePlayAudio = async (arrBuff: ArrayBuffer): Promise<void> => {
    const audioCtx = audioContext.current;
    const audioSrc = audioSource.current;

    if (isPlaying) {
      audioSrc?.stop(0);
      setIsPlaying(false);
    }

    if (audioCtx) {
      try {
        // Decode audio ArrayBuffer
        const decodedBuffer = await audioCtx.decodeAudioData(arrBuff);
  
        // Create new audio source and assign properties
        const newSrc = audioCtx.createBufferSource();
        newSrc.buffer = decodedBuffer;
        newSrc.connect(audioCtx.destination);
        newSrc.addEventListener('ended', () => setIsPlaying(false));
        
        // Play the audio
        audioSource.current = newSrc;
        audioSource.current.start(0);

        setIsPlaying(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

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
              <PoemCard key={i} poem={poem} index={i} onPlay={handlePlayAudio} />
            ))
          }
        </InnerContainer>
      )}
    </Container>
  );
};

Home.getInitialProps = async () => {
  const randomPoems = await API.poems.random(20);
  return { randomPoems };
}

export default Home;
