import AuthenticatedMobileNav from './AuthenticatedMobileNav';
import AuthenticatedDesktopNav from './AuthenticatedDesktopNav';

export const AuthenticatedNav = () => {
  return (
    <>
      <AuthenticatedDesktopNav />
      <AuthenticatedMobileNav />
    </>
  );
};

export default AuthenticatedNav; 