import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser && user === null) {
      navigate('/auth', { replace: true });
    }
  }, [navigate, user]);

  return user ? children : null;
}
