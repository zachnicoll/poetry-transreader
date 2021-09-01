import styled from "@emotion/styled";
import { colours } from "../../styles/colours";

export const Card = styled.div<{ width: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width}%;
  background-color: ${colours.paper};
  padding: 0.5em 1em;
  border-radius: 1em;
  height: fit-content;
  margin-bottom: 1em;
  height: 500px;
`;
