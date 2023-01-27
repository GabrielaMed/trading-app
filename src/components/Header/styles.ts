import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const Container = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.lightGreen};
  margin-bottom: 2rem;
  padding: 1rem;

  h1 {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

export const Box = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;
