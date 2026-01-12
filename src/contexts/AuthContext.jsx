import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('ams_currentUser');
    if (saved) setCurrentUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const signup = (username, password, email) => {
    const users = JSON.parse(localStorage.getItem('ams_users') || '[]');
    if (users.find((u) => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }
    const newUser = { username, password, email };
    users.push(newUser);
    localStorage.setItem('ams_users', JSON.stringify(users));
    localStorage.setItem('ams_currentUser', JSON.stringify({ username }));
    setCurrentUser({ username });
    return { success: true, message: 'Account created successfully' };
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('ams_users') || '[]');
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) return { success: false, message: 'Invalid credentials' };
    localStorage.setItem('ams_currentUser', JSON.stringify({ username }));
    setCurrentUser({ username });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('ams_currentUser');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;