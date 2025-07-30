import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      setUser({ name: "Admin", role: "admin", token: "123" });
    } else if (username === "user" && password === "user") {
      setUser({ name: "User", role: "user", token: "456" });
    } else {
      throw new Error("Hubo un error");
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
