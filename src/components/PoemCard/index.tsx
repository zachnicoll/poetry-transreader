import React, { useEffect, useRef, useState } from "react";
import { PoemResponse } from "API/types";
import { Card } from "../Card";
import * as styles from "./styles";
import { Row } from "Styles/containers";
import { Refresh, Translate, VolumeUpOutlined } from "@material-ui/icons";
import useTextToSpeech from "Hooks/useTextToSpeech";

interface PoemCardProps {
  poem: PoemResponse;
  index: number;
}

const SMALL_WIDTH = 45;
const GAP = 1;
const BIG_WIDTH = 100 - SMALL_WIDTH - GAP;

const PoemCard: React.FC<PoemCardProps> = ({ poem, index }) => {
  const { audioSrc, convertToAudio, loading } = useTextToSpeech();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [b64, setB64] = useState("");

  useEffect(() => {
    console.log(b64);
  }, [b64]);

  useEffect(() => {
    if (audioSrc) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => setB64(e.target?.result);
      fileReader.readAsDataURL(audioSrc);

      // const audio = new Audio(audioSrc);

      // audio.play();
    }
  }, [audioSrc]);

  const handleTextToSpeech = async (): Promise<void> => {
    const poemLines = poem.lines.join("\n");
    await convertToAudio(poemLines);
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
          <styles.IconButton>
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

      {/* {audioSrc && <audio ref={audioRef} src={audioSrc} preload="auto" controls/>} */}

      <a href={b64} download="tranlsate.mp3">
        Download mee
      </a>
    </Card>
  );
};

export default PoemCard;
