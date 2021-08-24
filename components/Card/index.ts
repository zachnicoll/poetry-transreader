import styled from "@emotion/styled";

export const Card = styled.div<{ flex: number }>`
  display: flex;
  flex: 0 0 ${({ flex }) => flex}%;
  background-color: #e8dcb8;
  padding: 0.5em 1em;
  border-radius: 1em;
  height: fit-content;
  margin-bottom: 1em;
`;
