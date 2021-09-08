import styled from "@emotion/styled";
import { colours } from "./colours";

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

export const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.button`
  padding: 4px;
  display: flex;
  background: none;
  border: none;

  &:active {
    outline: 1px solid ${colours.darkBlue};
  }

  &:hover {
    background: ${colours.darkPaper};
  }
`;
