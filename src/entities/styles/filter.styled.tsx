import styled from 'styled-components';

export const StyledFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input {
    max-width: 640px;
    width: 100%;
    font-size: 24px;
    outline: none;
    border: none;
    border-radius: 10px;
    padding: 15px 15px;
    margin: 0 2px 5px 0;

    ::placeholder {
      color: #c8c8c8;
    }
  }
  button {
    position: absolute;
    top: 2px;
    right: 0;
    padding: 16px 20px;
    margin: 0 2px 10px;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: #272727;
    font-weight: 700;
  }
`;
