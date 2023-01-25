import styled from 'styled-components';

export const CalendarActionsStyled = styled.div`
  display: flex;
  button {
    padding: 18px 15px;
    margin: 0 2px;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: #272727;
    font-weight: 700;
    height: 60px;
  }
`;

export const StyledInfoBtn = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  color: #fff;
  font-size: 16px;
  background-color: #272727;
  top: 2px;
  border-radius: 20px;
  right: 2px;
`;

export const StyledInfo = styled.div`
  position: absolute;
  bottom: -300px;
  border-radius: 10px;
  font-weight: 400;
  right: 50px;
  font-size: 16px;
  width: 300px;
  min-height: 200px;
  color: #fff;
  background-color: #151515;
  text-align: left;
  padding: 10px;
`;
