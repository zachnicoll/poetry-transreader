import styled from '@emotion/styled';
import breakpoints from 'Styles/breakpoints';
import colours from '../../styles/colours';

interface CardProps {
  width: number;
}

const Card = styled.div<CardProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  width: ${({ width }) => width}%;
  ${breakpoints.mobile('width: 100%;')}

  background-color: ${colours.paper};
  padding: 0.5em 1em;
  border-radius: 1em;
  height: fit-content;
  margin-bottom: 1em;
  height: 500px;
`;

export default Card;
