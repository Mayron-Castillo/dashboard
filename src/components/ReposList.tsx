import { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext.js";
const token = import.meta.env.VITE_GITHUB_TOKEN;
const username = import.meta.env.VITE_GITHUB_USER;

interface Repos {
  id: number;
  name: string;
  html_url: string;
}

function ReposList() {
  const [repos, setRepos] = useState<Repos[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { theme } = useTheme();

  // Llamo a la API para acceder a los repositorios
  // El token en si no es necesario, pero lo uso por si llegara a necesitar acceder a un repositorio privado
  useEffect(() => {
    const getRepos = async (): Promise<void> => {
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

        const data: Repos[] = await res.json();
        setRepos(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Hubo un error";
        setError(errorMessage);
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
        {repos.map((repo: Repos) => (
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
