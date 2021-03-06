import React, { useEffect } from 'react';
import { PoemResponse } from 'API/types';
import { Row } from 'Styles/containers';
import { Refresh, Translate, VolumeUpOutlined } from '@material-ui/icons';
import useTextToSpeech from 'Hooks/useTextToSpeech';
import * as styles from './styles';
import Card from '../Card';

interface PoemCardProps {
  poem: PoemResponse;
  index: number;
  onPlay: (audioBuffer: ArrayBuffer) => void;
  onTranslate: (poem: PoemResponse) => void;
}

const SMALL_WIDTH = 45;
const GAP = 1;
const BIG_WIDTH = 100 - SMALL_WIDTH - GAP;

const PoemCard: React.FC<PoemCardProps> = ({
  poem,
  index,
  onPlay,
  onTranslate
}) => {
  const { audioBuffer, convertToAudio, loading } = useTextToSpeech();

  useEffect(() => {
    if (audioBuffer) {
      onPlay(audioBuffer);
    }
  }, [audioBuffer]);

  const handleTextToSpeech = async (): Promise<void> => {
    const poemLines = poem.lines.join('\n');
    await convertToAudio(poemLines);
  };

  const handleTranslate = (): void => {
    onTranslate(poem);
  };

  return (
    <Card
      // Alternate widths to create a mosaic pattern of Cards
      width={index % 4 === 0 || index % 4 === 3 ? SMALL_WIDTH : BIG_WIDTH}
      key={poem.title}
    >
      <h1>{poem.title}</h1>
      <Row>
        <h3>{poem.author}</h3>
        <styles.IconContainer>
          <styles.IconButton onClick={handleTranslate}>
            <Translate />
          </styles.IconButton>

          <styles.IconButton onClick={handleTextToSpeech}>
            {loading ? <Refresh /> : <VolumeUpOutlined />}
          </styles.IconButton>
        </styles.IconContainer>
      </Row>

      <styles.Line />
      <styles.ScrollBox>
        {poem.lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </styles.ScrollBox>
      <styles.Fade />
    </Card>
  );
};

export default PoemCard;
