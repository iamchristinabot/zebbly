import React from 'react';
import { AuthProps } from '../types/app';

export const withAuthentication = <P extends object>(
  WrappedComponent: React.ComponentType<P & AuthProps>
): React.FC<P & AuthProps> => {
  return ({ isAuthenticated, ...props }: AuthProps & P) => {
    return <WrappedComponent isAuthenticated={isAuthenticated} {...(props as P)} />;
  };
}; 