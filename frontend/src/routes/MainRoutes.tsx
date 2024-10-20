import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import Layout from '@layouts/Layout';

import NotFound from '@pages/404';
import Biblioteca from '@pages/biblioteca';
import Dashboard from '@pages/dashboard';
import Login from '@pages/login';

import { useAuthStore } from '@stores/AuthStore';

import ProtectedRoute from './ProtectedRoute';

const MainRoutes: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/biblioteca' element={<Biblioteca />} />
          </Route>

          {/* 404 Not Found Route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default MainRoutes;
