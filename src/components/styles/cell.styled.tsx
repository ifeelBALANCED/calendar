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
  @media screen and (max-width: 1024px) {
    height: 80px;
    font-size: 14px;

    ${(props: {
      isActive?: boolean;
      isHolidays?: boolean;
      isDays?: boolean;
      isEmpty?: boolean;
      // eslint-disable-next-line consistent-return
    }) => {
      if (props.isActive) {
        return `background-color: #fed766;
              color: #272727;`;
      }
      if (props.isHolidays) {
        return `background-color: #272727;`;
      }
      if (props.isDays) {
        return `background-color: #fed766;
              color: #272727;
              height: 40px;`;
      }
      if (props.isEmpty) {
        return `background-color: #fed766;`;
      }
      return `background-color: #272727;`;
    }}
  }
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
  font-size: 14px;
  span {
    max-width: 300px;
    overflow: hidden;
  }

  @media screen and (max-width: 1024px) {
    background-color: #efefef;
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

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const TasksWrapperMobile = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
    ::-webkit-scrollbar {
      width: 0;
    }
    overflow-y: auto;
    margin-top: 5px;
    height: 100%;
  }
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
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const CellActionMobile = styled.div`
  display: none;
  button {
    width: 100%;
    height: 50px;
    font-size: 30px;
    background-color: transparent;
    color: #fff;
    border: none;
    font-weight: 600;
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props: { isActive?: boolean }) => {
      return `button { color: ${props.isActive ? '#272727' : '#fff'} }`;
    }}
  }
`;
