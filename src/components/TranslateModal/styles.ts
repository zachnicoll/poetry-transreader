import styled from '@emotion/styled';
import { Refresh, VolumeUpOutlined } from '@material-ui/icons';
import colours from 'Styles/colours';
import { ButtonContainer } from 'Styles/containers';

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export const PoemBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  flex: 1;
`;

export const PoemContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colours.darkBlue};
  border-radius: 1em;
  padding: 0.5em 1em;
  height: 90%;
  justify-content: space-between;
`;

export const ScrollBox = styled.div`
  overflow: auto;

  p {
    color: ${colours.paper};
    margin: 0px;
    margin-bottom: 0.5em;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colours.paper};
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colours.darkPaper};
  }
`;

export const SelectContainer = styled.div`
  width: 25%;
  margin-left: 1em;
  margin-right: 1em;
`;

export const CloseContainer = styled(ButtonContainer)`
  width: fit-content;
`;

export const SpeakContainer = styled(ButtonContainer)`
  width: fit-content;
  align-self: flex-end;
  margin-top: 0.5em;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Speak = styled(VolumeUpOutlined)`
  fill: ${colours.paper} !important;
`;

export const Loading = styled(Refresh)`
  fill: ${colours.paper} !important;
`;
