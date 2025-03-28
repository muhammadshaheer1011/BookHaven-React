import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user data from local storage on app start
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Login function
  const login = (username, password) => {
    const users = [
      { username: "shaheer", password: "8719" },
      { username: "ali", password: "1234" },
    ];

    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      setUser({ username, favorites: JSON.parse(localStorage.getItem(username)) || [] });
      localStorage.setItem("user", JSON.stringify({ username, favorites: JSON.parse(localStorage.getItem(username)) || [] }));
      return true;
    }
    return false;
  };

  // Logout function (clears user state but keeps stored favorites)
  const logout = () => {
    if (user) {
      localStorage.setItem(user.username, JSON.stringify(user.favorites)); // Save favorites
    }
    localStorage.removeItem("user"); // Remove active session
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
