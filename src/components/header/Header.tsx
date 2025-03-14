import React from 'react';
import AuthenticatedNav from './AuthenticatedNav';
import UnauthenticatedNav from './UnauthenticatedNav';

interface HeaderProps {
  isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />;
};

export default Header; 