import styled from '@emotion/styled';
import breakpoints from 'Styles/breakpoints';
import colours from 'Styles/colours';
import { ButtonContainer } from 'Styles/containers';

export const Container = styled.div`
  width: 100%;
  border-radius: 100em;
  background-color: ${colours.paper};
  display: flex;
  align-items: center;

  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;

  ${breakpoints.mobile(`
      flex-direction: column;
      justify-content: space-between;
    `)}
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

interface ButtonProps {
  selected: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: ${({ selected }) => (selected ? colours.darkBlue : 'none')};
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

export const TitleAuthorContainer = styled.div`
  display: flex;
`;

export const InputReturnContainer = styled.div`
  display: flex;
  flex: 1;

  ${breakpoints.mobile(`
    flex: 0; 
    width: 90%; 
    margin-top: 0.5em;
  `)}
`;
