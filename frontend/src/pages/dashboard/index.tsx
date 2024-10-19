import { useThemeStore } from '@stores/ThemeStore';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <h1 className={`text-light-secondary dark:text-dark-secondary`}>
        Hello World
      </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
