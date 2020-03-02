import React, { createContext } from 'react';

const AreaContext = createContext();

const { Provider } = AreaContext;

const AreaProvider = ({ children, dims, hoverLine }) => (
  <Provider value={{ dims, hoverLine }}>
    {children}
  </Provider>
);
export { AreaContext, AreaProvider };
