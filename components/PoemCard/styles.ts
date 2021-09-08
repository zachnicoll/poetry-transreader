import styled from "@emotion/styled";
import { colours } from "Styles/colours";

export const ScrollBox = styled.div`
  position: relative;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colours.darkPaper};
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colours.darkBlue};
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colours.blue};
  }
`;

export const Fade = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-radius: 1em;
  width: 100%;
  height: 150px;

  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(232, 220, 184, 1) 100%
  );
`;

export const Line = styled.hr`
  width: 100%;
  border: solid 1px ${colours.darkBlue};
`;
