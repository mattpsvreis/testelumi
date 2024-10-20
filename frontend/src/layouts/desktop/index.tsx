import { useLocation } from 'react-router-dom';

import DesktopHeader from './components/desktop-header';

interface DesktopLayout {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayout> = ({ children }) => {
  const pathname = useLocation().pathname;

  return (
    <div className='flex min-h-screen w-full flex-col bg-light-background dark:bg-dark-background'>
      {Boolean(pathname !== '/login') && <DesktopHeader />}
      {Boolean(pathname !== '/login') && (
        <hr className='h-[1px] border-none bg-dark-background dark:bg-light-background' />
      )}
      <div className='mx-8'>{children}</div>
    </div>
  );
};

export default DesktopLayout;
