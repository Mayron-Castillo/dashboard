import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // está función se usa para obtener el tema guardado en el local storage
  // si hay un error lo obtiene y lo muestra por consola
  // Si no existe un tema guardado en el local storage por default se usa el light
  const initialTheme = () => {
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "light";
    } catch (error) {
      console.error("Hubo un error en el Local Storage", error);
      return "light";
    }
  };

  const [theme, setTheme] = useState(initialTheme);

  // Cada vez que cambia theme se guarda en el Local Storage y se actualiza el estado de theme
  // Si hay un error lo captura y muestra por consola
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error al guardar en LocalStorage", error);
    }
  }, [theme]);

  // Al dar clic cambia, si está en claro, cambia a oscuro y si está en oscuro cambia a claro
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// Lo exportamos de está manera así en los componentes que queremos llamar a theme context
// no tenemos que usar useContext(ThemeContext) en cada uno y solo usamos useTheme()
export function useTheme() {
  return useContext(ThemeContext);
}
