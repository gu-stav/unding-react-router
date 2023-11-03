import { createContext, useContext } from 'react';

const ConfigContext = createContext({});

export const { Provider } = ConfigContext;

export const useConfig = () => useContext(ConfigContext);
