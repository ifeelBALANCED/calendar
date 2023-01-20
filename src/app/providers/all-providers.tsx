import { PropsWithChildren, StrictMode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from '../store';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', sans-serif;
  }
`;
export const AllProviders = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Global />
        {children}
      </Provider>
    </StrictMode>
  );
};
