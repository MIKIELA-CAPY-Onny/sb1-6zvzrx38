import * as React from 'react';
import { useAuth } from '../hooks/useAuth';

type AuthContextType = {
  user: any;
  loading: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}