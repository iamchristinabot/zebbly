import { ReactNode } from 'react';

export interface AuthProps {
  isAuthenticated: boolean;
}

export interface UserProfileProps extends AuthProps {
  userId: string;
}

export interface LoginProps {
  onLogin: () => void;
}

export interface StoreProviderProps {
  children: ReactNode;
}

export interface RouteConfig {
  path: string;
  element: ReactNode;
  action?: () => void;
} 