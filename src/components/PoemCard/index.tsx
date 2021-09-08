import React from "react";
import { PoemResponse } from "API/types";
import { Card } from "../Card";
import * as styles from "./styles";
import { Row } from "Styles/containers";
import { colours } from "Styles/colours";
import { Translate, VolumeUp, VolumeUpOutlined } from "@material-ui/icons";

interface PoemCardProps {
  poem: PoemResponse;
  index: number;
}

const SMALL_WIDTH = 45;
const GAP = 1;
const BIG_WIDTH = 100 - SMALL_WIDTH - GAP;

const PoemCard: React.FC<PoemCardProps> = ({ poem, index }) => {
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

          <styles.IconButton>
            <VolumeUpOutlined />
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
