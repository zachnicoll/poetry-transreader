import { PoemResponse } from 'API/types';
import useTextToSpeech from 'Hooks/useTextToSpeech';
import React, { useEffect } from 'react';
import * as styles from '../styles';

interface PoemBoxProps {
  poem: PoemResponse | null;
  language?: string;
  onPlay: (audioBuffer: ArrayBuffer) => void;
}

const PoemBox: React.FC<PoemBoxProps> = ({ poem, language, onPlay }) => {
  const { audioBuffer, convertToAudio, loading } = useTextToSpeech();

  useEffect(() => {
    if (audioBuffer) {
      onPlay(audioBuffer);
    }
  }, [audioBuffer]);

  const handleTextToSpeech = async (
    selectedPoem: PoemResponse
  ): Promise<void> => {
    const poemLines = selectedPoem.lines.join('\n');
    await convertToAudio(poemLines, language);
  };

  return (
    <styles.PoemBoxContainer>
      <styles.PoemContainer>
        <styles.ScrollBox>
          {poem ? (
            poem.lines.map((line, i) => <p key={i}>{line}</p>)
          ) : (
            <p>Select a language to translate the poem to...</p>
          )}
        </styles.ScrollBox>

        {poem && (
          <styles.SpeakContainer onClick={() => handleTextToSpeech(poem)}>
            {loading ? <styles.Loading /> : <styles.Speak />}
          </styles.SpeakContainer>
        )}
      </styles.PoemContainer>
    </styles.PoemBoxContainer>
  );
};

export default PoemBox;
