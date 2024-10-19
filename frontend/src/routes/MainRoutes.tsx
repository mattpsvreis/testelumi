import Layout from '@layouts/Layout';
import { useAuthStore } from '@stores/AuthStore';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from '@pages/home';
import Login from '@pages/login';

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
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default MainRoutes;
