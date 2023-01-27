import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const Container = styled.div`
  margin: 0px;
  padding: 0px;
  padding-bottom: 0.5rem;
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.lightGreen};
  margin-bottom: 2rem;
`;
