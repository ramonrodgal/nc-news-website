import { createContext, useState } from 'react';

export const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  const isLoggedIn = !!user.username;

  const logout = () => {
    setUser({});
  };

  return (
    <userContext.Provider value={{ user, setUser, isLoggedIn, logout }}>
      {children}
    </userContext.Provider>
  );
}
