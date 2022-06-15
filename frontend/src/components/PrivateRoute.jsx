import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// spinner
import Spinner from './Spinner';

const PrivateRoute = () => {
  // custom hook
  const { loggedIn, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;

// private route: since React Router v6 doesn't allow
// nesting routes to create private route, we have to
// create this instead (like Firebase project)
