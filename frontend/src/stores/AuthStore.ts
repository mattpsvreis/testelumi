import { create } from 'zustand';

interface AuthState {
  username: string;
  inputUsername: string;
  inputPassword: string;
  isAuthenticated: boolean;
  setUsername: (username: string) => void;
  setInputUsername: (inputUsername: string) => void;
  setInputPassword: (inputPassword: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  username: '',
  password: '',
  inputUsername: '',
  inputPassword: '',
  isAuthenticated:
    localStorage.getItem('isAuthenticated') === 'true' ? true : false,
  setUsername: (username) => set({ username }),
  setInputUsername: (inputUsername) => set({ inputUsername }),
  setInputPassword: (inputPassword) => set({ inputPassword }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
