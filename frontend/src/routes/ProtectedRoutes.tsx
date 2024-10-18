import { Navigate, Route } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
  [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to='/login' />}
    />
  );
};

export default ProtectedRoute;
