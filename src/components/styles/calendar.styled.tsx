import styled from 'styled-components';

export const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  ::-webkit-scrollbar {
    width: 0;
  }

  @media screen and (max-width: 1024px) {
    justify-content: flex-start;
  }
`;
