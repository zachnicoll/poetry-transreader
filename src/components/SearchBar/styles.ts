import styled from "@emotion/styled";
import { KeyboardReturn } from "@material-ui/icons";
import { colours } from "Styles/colours";
import { ButtonContainer } from "Styles/containers";

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

export const IconButton = styled(ButtonContainer)`
  margin-left: 0.5em;
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
