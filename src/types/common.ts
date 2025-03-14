export interface AuthenticatedProps {
  isAuthenticated: boolean;
}

export interface ProfilePageProps extends AuthenticatedProps {
  userId: string;
}

export interface LoginPageProps {
  onLogin: () => void;
}

export interface MarketingPageProps {}

// Add any additional common interfaces here 