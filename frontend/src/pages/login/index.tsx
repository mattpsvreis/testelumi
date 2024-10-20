import { useState } from 'react';

import { Eye, EyeSlash } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

import Input from '@components/data-input/input';

import { useAuthStore } from '@stores/AuthStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    inputUsername,
    setInputUsername,
    inputPassword,
    setInputPassword,
    setUsername,
    setIsAuthenticated,
  } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setUsername(inputUsername);

    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');

    navigate('/dashboard');
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <form
        onSubmit={handleLogin}
        className='w-80 rounded border border-black bg-white p-8 shadow-xl dark:border-white dark:bg-dark-foreground/60'
      >
        <div className='mb-4 flex flex-col gap-2'>
          <label className='text-lg font-medium text-light-text dark:text-dark-text'>
            Email:
          </label>
          <Input
            type='text'
            value={inputUsername}
            onChange={setInputUsername}
            required
          />
        </div>
        <div className='relative mb-4 flex flex-col gap-2'>
          <label className='text-lg font-medium text-light-text dark:text-dark-text'>
            Senha:
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={inputPassword}
            onChange={setInputPassword}
            required
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='text-secondary absolute bottom-2.5 right-3 dark:text-dark-text'
          >
            {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type='submit'
          className='w-full rounded bg-light-primary py-2 font-semibold text-light-text dark:bg-dark-primary'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
