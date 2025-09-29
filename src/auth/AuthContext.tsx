import { createContext, useContext, useState, type ReactNode } from "react";

//Se maneja el tipo de usuario
interface User {
  name: string;
  role: "admin" | "user";
}
//Los datos que se esperan recibir en el login
interface LoginData {
  username: string;
  password: string;
}
//Interfaz del contexto en la autenticación
interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

// Props del children
interface AuthProviderProps {
  children: ReactNode;
}

//Se crea el contexto, inicialmente con un undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  //Función para el inicio de sesión
  const login = async ({ username, password }: LoginData) => {
    if (username === "admin" && password === "admin") {
      setUser({ name: username, role: "admin" });
    } else {
      setUser({ name: username, role: "user" });
    }
  };

  //Función para cerrar sesión
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useTheme no está dentro del AuthProvider");
  }
  return context;
}
