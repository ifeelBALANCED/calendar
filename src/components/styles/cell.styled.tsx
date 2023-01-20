import styled from 'styled-components';

export const StyledCell = styled.div`
  width: 200px;
  height: 100px;
  text-align: left;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px;
  font-size: 24px;
  overflow-y: auto;

  small {
    font-weight: 400;
    display: block;
    background-color: aliceblue;
    margin: 4px;
    cursor: pointer;
  }

  button {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }

  ${(props: { isActive: boolean; isHolidays: boolean }) => {
    return `background-color: ${props.isActive ? '#74628b' : '#534b62'};
            color: ${props.isHolidays ? 'purple' : 'black'}
    `;
  }}
`;
