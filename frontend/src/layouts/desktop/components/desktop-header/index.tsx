import { useAuthStore } from '@stores/AuthStore';
import { useThemeStore } from '@stores/ThemeStore';
import { Link, useNavigate } from 'react-router-dom';

interface DesktopHeaderProps {
  shouldRender?: boolean;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  shouldRender = true,
}) => {
  const { theme, toggleTheme } = useThemeStore();
  const { setUsername, setIsAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  function handleLogout() {
    setUsername('');
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  return shouldRender ? (
    <div className='flex min-h-12 w-full flex-row items-center justify-between px-8'>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div className='flex flex-row gap-4'>
        <button type='button' onClick={() => toggleTheme()}>
          {theme.charAt(0).toUpperCase() + theme.slice(1).toLowerCase()} Mode
        </button>
        <button type='button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  ) : null;
};

export default DesktopHeader;
