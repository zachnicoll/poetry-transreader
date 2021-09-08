import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colours } from "../../styles/colours";

export const Container = styled.div`
  width: 100%;
  border-radius: 100em;
  background-color: ${colours.paper};
  height: 4em;
  display: flex;
  align-items: center;
  padding: 1em;
`;

export const Input = styled.input`
  flex: 1;
  margin-left: 1em;
  background: none;
  border: none;
  border-bottom: 2px solid ${colours.darkBlue};
  padding: 0.5em;

  &:focus-visible {
    outline: none;
    background: ${colours.darkPaper};
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  display: block;
  margin-left: 0.5em;

  &:hover {
    background: ${colours.darkPaper};
  }
`;

export const Button = styled.button<{ selected: boolean }>`
  background: ${({ selected }) => (selected ? colours.darkBlue : "none")};
  color: ${({ selected }) => (selected ? colours.paper : colours.darkBlue)};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  flex: 0.05;

  &:hover {
    background: ${colours.darkPaper};
    color: ${colours.darkBlue};
  }
`;
