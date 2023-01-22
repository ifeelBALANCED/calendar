import { PropsWithChildren, StrictMode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store';

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
        <PersistGate loading={null} persistor={persistor}>
          <Global />
          {children}
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};
