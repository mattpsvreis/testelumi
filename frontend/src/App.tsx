import { useEffect } from 'react';

import { useThemeStore } from '@stores/themeStore';

function App() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <h1 className={`text-light-primary dark:text-dark-secondary`}>
        Hello World
      </h1>
    </div>
  );
}

export default App;
