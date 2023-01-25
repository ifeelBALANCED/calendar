import { ComponentType, PropsWithChildren, ProviderProps, ReactElement, StrictMode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store';

type IProviderOrWithValue<T = any> = ComponentType<T> | [ComponentType<T>, T];
export const combineProviders =
  (providers: Array<IProviderOrWithValue>) =>
  ({ children }: PropsWithChildren<{ value?: unknown[] }>) =>
    providers.reduceRight<ReactElement<ProviderProps<unknown>>>((tree, ProviderOrWithValue) => {
      if (Array.isArray(ProviderOrWithValue)) {
        const [Provider, value] = ProviderOrWithValue;
        return <Provider {...value}>{tree}</Provider>;
      }
      return <ProviderOrWithValue>{tree}</ProviderOrWithValue>;
    }, children as ReactElement);

export const AllProviders = combineProviders([
  [StrictMode, {}],
  [StoreProvider, { store }],
  [PersistGate, { persistor }],
]);
