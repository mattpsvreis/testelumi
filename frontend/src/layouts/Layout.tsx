import { useMediaQuery } from 'react-responsive';

import DesktopLayout from './desktop';
import MobileLayout from './mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  return isDesktop ? (
    <DesktopLayout>{children}</DesktopLayout>
  ) : (
    <MobileLayout>{children}</MobileLayout>
  );
};

export default Layout;
