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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 16px;
  min-height: 30px;
  padding: 5px;

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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

export const ColorLabelsWrapper = styled.div`
  display: flex;
`;
export const CellColorLabel = styled.div`
  display: inline-block;
  width: 100%;
  height: 5px;
  margin: 0 1px;
  border-radius: 2px;

  ${(props: { red?: boolean; orange?: boolean; green?: boolean }) => {
    if (props.red) {
      return 'background-color: red';
    }
    if (props.orange) {
      return 'background-color: orange';
    }
    return 'background-color: green';
  }}
`;

export const FilterColorBtn = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50px;
  border: none;
  margin: 0 5px;
  cursor: pointer;

  ${(props: { red?: boolean; orange?: boolean; green?: boolean; active?: boolean }) => {
    if (props.red && props.active) {
      return 'background-color: red';
    }
    if (props.red) {
      return 'background-color: rgba(255, 0, 0, 0.41)';
    }
    if (props.orange && props.active) {
      return 'background-color: orange';
    }
    if (props.orange) {
      return 'background-color: rgba(255, 165, 0, 0.41)';
    }
    if (props.green && props.active) {
      return 'background-color: green';
    }
    return 'background-color: rgba(0, 128, 0, 0.41)';
  }}
`;
