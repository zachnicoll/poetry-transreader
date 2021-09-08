import styled from "@emotion/styled";
import { colours } from "Styles/colours";

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
