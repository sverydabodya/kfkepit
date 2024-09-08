import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { User } from '../model/user';
import { getLoggedInUser } from '../network/auth_api';

const AuthContext = createContext<User | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const loggedInUser = await getLoggedInUser();
          if (loggedInUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
          }
          setUser(loggedInUser);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
