import { useEffect } from 'react';

import MainRoutes from '@routes/MainRoutes';
import { useThemeStore } from '@stores/ThemeStore';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <MainRoutes></MainRoutes>;
}

export default App;
