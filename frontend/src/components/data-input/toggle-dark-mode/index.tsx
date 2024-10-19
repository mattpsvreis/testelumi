import React from 'react';

import { useThemeStore } from '@stores/ThemeStore';
import { Moon, Sun } from 'phosphor-react';

interface ToggleDarkModeProps {
  id?: string;
}

const ToggleDarkMode: React.FC<ToggleDarkModeProps> = ({ id }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div
      id={id}
      className={`relative flex h-8 w-16 cursor-pointer items-center justify-between rounded-full px-1 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-dark-text' : 'bg-light-foreground'
      }`}
      onClick={() => toggleTheme()}
    >
      <Moon size={24} className='text-light-text' />
      <Sun size={24} className='text-dark-text' />
      <div
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-dark-text transition-transform duration-300 dark:bg-light-text ${
          theme === 'dark' ? 'translate-x-8 transform' : ''
        }`}
      />
    </div>
  );
};

export default ToggleDarkMode;
