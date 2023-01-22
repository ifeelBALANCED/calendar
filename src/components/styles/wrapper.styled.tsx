import styled from 'styled-components';

export const WrapperStyled = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 50px 10px;
  min-width: 350px;

  @media screen and (max-width: 1024px) {
    padding: 10px;
  }
`;
