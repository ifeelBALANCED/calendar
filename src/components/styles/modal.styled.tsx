import styled from 'styled-components';

export const ModalWrap = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: #272727;

  h2 {
    margin-bottom: 5px;
  }

  ${(props: { holiday: boolean }) => {
    return `background-color: ${props.holiday ? '#fed766' : '#fff'}`;
  }}
`;
export const OverLay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
`;

export const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-left: auto;
  border-radius: 10px;
`;

export const ModalInput = styled.input`
  padding: 10px;
  outline: none;
  border: none;
  background-color: #efefef;
  font-size: 24px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

export const EnterButton = styled.button`
  padding: 10px;
  outline: none;
  border: none;
  font-size: 24px;
  border-radius: 10px;
  transition: all 0.3s;
  margin: 0 0 5px 0;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export const StyledHoliday = styled.div`
  color: #272727;
  font-size: 28px;
  font-weight: 400;
`;

export const ModalLabelsWrapper = styled.div`
  display: flex;
  label {
    border-radius: 5px;
    margin: 0 5px;
    width: 100%;
    &:nth-child(1) {
      margin-left: 0;
    }
    &:nth-child(3) {
      margin-right: 0;
    }
  }
  input {
    visibility: hidden;
  }
`;

export const ModalLabel = styled.label`
  ${(props: {
    red?: boolean;
    orange?: boolean;
    green?: boolean;
    checkedRed?: boolean;
    checkedOrange?: boolean;
    checkedGreen?: boolean;
  }) => {
    if (props.red && props.checkedRed) {
      return 'background-color: red';
    }
    if (props.red) {
      return 'background-color: rgba(255, 0, 0, 0.41)';
    }
    if (props.orange && props.checkedOrange) {
      return 'background-color: orange';
    }
    if (props.orange) {
      return 'background-color: rgba(255, 165, 0, 0.41)';
    }
    if (props.green && props.checkedGreen) {
      return 'background-color: green';
    }
    return 'background-color: rgba(0, 128, 0, 0.41)';
  }}
`;
