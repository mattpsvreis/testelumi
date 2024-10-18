import { useAuthStore } from '@stores/AuthStore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

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

    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
