import { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext";
const token = import.meta.env.VITE_GITHUB_TOKEN;
const username = import.meta.env.VITE_GITHUB_USER;

function ReposList() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Llamo a la API para acceder a los repositorios
  // El token en si no es necesario, pero lo uso por si llegara a necesitar acceder a un repositorio privado
  useEffect(() => {
    const getRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, []);

  // Validaciones de renderizado, para evitar errores
  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!repos) return null;

  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className={`${
              theme === "light" ? "bg-gray-300" : "bg-gray-800"
            } p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <p className="text-lg sm:text-xl font-semibold text-center mb-3 break-words">
              {repo.name}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Ir al repositorio
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReposList;
