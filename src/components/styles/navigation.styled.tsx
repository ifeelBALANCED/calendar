import styled from 'styled-components';

export const StyledNavigation = styled.div`
  display: flex;
  justify-content: center;
  button {
    padding: 15px 20px;
    margin: 0 2px 10px;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: #272727;
    font-weight: 700;
  }

  div {
    display: inline-block;
    background-color: #fff;
    width: 300px;
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    padding: 15px 20px;
    margin: 0 2px 10px;
    border: none;
    border-radius: 10px;
    color: #272727;
  }

  @media screen and (max-width: 1024px) {
    button {
      padding: 0 15px;
      font-size: 16px;
      width: 100%;
      &:nth-child(6) {
        margin-right: 0;
      }
      &:nth-child(1) {
        margin-left: 0;
      }
    }
    div {
      max-width: 200px;
      width: 100%;
      min-width: 100px;
      min-height: 56px;
      padding: 5px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media screen and (max-width: 768px) {
    button {
      padding: 0 10px;
      font-size: 14px;
      width: 100%;
      &:nth-child(6) {
        margin-right: 0;
      }
      &:nth-child(1) {
        margin-left: 0;
      }
    }
    div {
      max-width: 200px;
      width: 100%;
      min-width: 100px;
      min-height: 56px;
      padding: 5px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
