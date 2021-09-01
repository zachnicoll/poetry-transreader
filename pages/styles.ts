import styled from "@emotion/styled";
import { colours } from "../styles/colours";

export const Container = styled.div`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #040720;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  width: 100%;
`;

export const Heading = styled.h1`
  color: ${colours.paper};
  margin: 0px;
  margin-left: 0.5em;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`;

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
