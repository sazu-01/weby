import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../App/hook';
import { getCurrentUser } from '../../Features/authSlice';

const SetAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Set localStorage flag
      localStorage.setItem('isLoggedIn', 'true');
      
      // Dispatch getCurrentUser to populate user state
      dispatch(getCurrentUser())
        .then(() => {
          // Redirect to dashboard
          navigate('/user-dashboard');
        })
        .catch(() => {
          // If getting current user fails, redirect to login
          navigate('/login');
        });
    } else {
      // No token, redirect to login
      navigate('/login');
    }
  }, [navigate, dispatch]);

  return <div>Authenticating...</div>;
};

export default SetAuth;

