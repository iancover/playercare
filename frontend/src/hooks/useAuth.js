import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  // states to update login and loading while checking status
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // get user from state w/useSelector
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, [user]);

  return { loggedIn, loading };
};

// Custom Hook to redirect user trying private route not logged in
// 'useSelector' to get 'user' from state using 'redux' store
