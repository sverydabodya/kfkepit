import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/auth", { replace: true });
    }
  }, [navigate, user, loading]);

  if (loading) {
    return <div></div>;
  }

  return user ? children : null;
}
