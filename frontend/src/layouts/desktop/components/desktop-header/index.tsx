import { useAuthStore } from '@stores/AuthStore';
import { useThemeStore } from '@stores/ThemeStore';
import { ChartBar, SignOut, Table } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';

import ToolTip from '@components/data-display/tooltip';
import ToggleDarkMode from '@components/data-input/toggle-dark-mode';

interface DesktopHeaderProps {
  shouldRender?: boolean;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  shouldRender = true,
}) => {
  const { theme } = useThemeStore();

  const { setUsername, setIsAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  function handleLogout() {
    setUsername('');
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  return shouldRender ? (
    <div className='flex min-h-12 w-full flex-row items-center justify-between px-8 py-4 shadow-lg'>
      <div className='flex flex-row items-center gap-4'>
        <Link to='/dashboard' className='no-outline-border outline-none'>
          <ChartBar
            id='dashboard-navigator'
            size={32}
            className='no-outline-border text-light-text outline-none dark:text-dark-text'
          />
          <ToolTip anchorSelect='#dashboard-navigator' placement='right'>
            <span>Dashboard</span>
          </ToolTip>
        </Link>
        <Link to='/biblioteca' className='no-outline-border outline-none'>
          <Table
            id='library-navigator'
            size={32}
            className='no-outline-border text-light-text outline-none dark:text-dark-text'
          />
          <ToolTip anchorSelect='#library-navigator' placement='right'>
            <span>Biblioteca de Faturas</span>
          </ToolTip>
        </Link>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <ToggleDarkMode id='toggle-darkmode-button' />
        <ToolTip anchorSelect='#toggle-darkmode-button' placement='left'>
          <span>Trocar para {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </ToolTip>
        <button type='button' onClick={handleLogout}>
          <SignOut
            id='logout-button'
            size={32}
            className='no-outline-border text-light-text outline-none dark:text-dark-text'
          />
          <ToolTip anchorSelect='#logout-button' placement='left'>
            <span>Logout</span>
          </ToolTip>
        </button>
      </div>
    </div>
  ) : null;
};

export default DesktopHeader;
