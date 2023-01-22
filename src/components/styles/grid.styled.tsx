import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(10px, 240px));
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4px;
  overflow: scroll;
  min-height: 70px;
  border-radius: 10px;
  min-width: 50px;

  ::-webkit-scrollbar {
    width: 0;
  }

  ${(props: { weekDays?: boolean }) => {
    return `padding-bottom: ${props.weekDays ? '0' : '40px'}`;
  }}
`;
