import React from 'react';
import CirclesForUI from './forUI';
import { CirclesProvider } from '../../Contexts/Circles';

const WrappedComponent = () => (
  <CirclesProvider>
    <CirclesForUI />
  </CirclesProvider>
);

export default WrappedComponent;
