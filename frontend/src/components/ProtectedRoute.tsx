import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/auth', { replace: true });
    }
  }, [navigate, user]);

  // Повертаємо дітей тільки тоді, коли користувач аутентифікований
  return user ? children : null;
}