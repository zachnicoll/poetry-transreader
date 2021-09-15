import { PoemResponse } from 'API/types';
import useTextToSpeech from 'Hooks/useTextToSpeech';
import React, { useEffect } from 'react';
import { ButtonContainer } from 'Styles/containers';
import * as styles from '../styles';

interface PoemBoxProps {
  poem: PoemResponse;
  onPlay: (audioBuffer: ArrayBuffer) => void;
}

const PoemBox: React.FC<PoemBoxProps> = ({ poem, onPlay }) => {
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
    await convertToAudio(poemLines);
  };

  return (
    <styles.PoemBoxContainer>
      <styles.PoemContainer>
        <styles.ScrollBox>
          {poem.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </styles.ScrollBox>

        <styles.SpeakContainer onClick={() => handleTextToSpeech(poem)}>
          {loading ? <styles.Loading /> : <styles.Speak />}
        </styles.SpeakContainer>
      </styles.PoemContainer>
    </styles.PoemBoxContainer>
  );
};

export default PoemBox;
