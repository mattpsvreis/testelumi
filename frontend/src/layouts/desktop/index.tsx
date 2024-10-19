import { useLocation } from 'react-router-dom';

import DesktopHeader from './components/desktop-header';

interface DesktopLayout {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayout> = ({ children }) => {
  const pathname = useLocation().pathname;

  return (
    <div className='flex min-h-screen w-full flex-col'>
      {Boolean(pathname !== '/login') && <DesktopHeader />}
      <hr />
      {children}
    </div>
  );
};

export default DesktopLayout;
