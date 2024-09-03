import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { User } from '../model/user';
import { getLoggedInUser } from '../network/auth_api';

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
  initialSignedIn?: boolean;
};

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const loggedInUser = await getLoggedInUser();
          setUser(loggedInUser);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <div>
      loading...
    </div>;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
