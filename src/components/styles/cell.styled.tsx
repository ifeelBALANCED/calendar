import styled from 'styled-components';

export const StyledCell = styled.div`
  max-width: 240px;
  width: 100%;
  height: 250px;
  text-align: left;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px 5px;
  font-size: 20px;
  color: white;
  overflow: hidden;
  min-width: 40px;

  small {
    font-weight: 400;
    display: block;
    background-color: aliceblue;
    margin: 4px;
    cursor: pointer;
  }

  ${(props: { isActive?: boolean; isHolidays?: boolean; isDays?: boolean; isEmpty?: boolean }) => {
    if (props.isActive) {
      return `background-color: #fed766;
              color: #272727`;
    }
    if (props.isHolidays) {
      return `background-color: #272727`;
    }
    if (props.isDays) {
      return `background-color: #fed766;
              color: #272727;
              height: 50px`;
    }
    if (props.isEmpty) {
      return `background-color: #fed766`;
    }
    return `background-color: #272727`;
  }};
`;

export const StyledTask = styled.div`
  border-radius: 10px;
  color: #000;
  background-color: white;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 16px;
  span {
    max-width: 300px;
    overflow: hidden;
  }
`;

export const TasksWrapper = styled.div`
  ::-webkit-scrollbar {
    width: 0;
  }
  overflow-y: auto;
  margin-top: 5px;
  height: 100%;
  padding-bottom: 50px;
`;
export const DeleteTask = styled.button`
  background-color: transparent;
  border: none;
  color: #272727;
`;

export const CellButton = styled.button`
  width: 24px;
  height: 24px;
  color: #272727;
  border-radius: 50px;
  border: 0;
  font-size: 22px;
  font-weight: 700;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CellAction = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledHolidays = styled.div`
  background-color: #efefef;
  border-radius: 5px;
  padding: 5px;
`;

export const CellColorLabel = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;

  ${(props: { red?: boolean; orange?: boolean; yellow?: boolean; green?: boolean }) => {
    if (props.red) {
      return 'background-color: red';
    }
    if (props.orange) {
      return 'background-color: orange';
    }
    if (props.yellow) {
      return 'background-color: yellow';
    }
    return 'background-color: green';
  }}
`;
