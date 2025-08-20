import { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext";
const token = import.meta.env.VITE_GITHUB_TOKEN;
const username = import.meta.env.VITE_GITHUB_USER;

function ReposList() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

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

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!repos) return null;

  return (
    <ul
      className={`${
        theme === "light" ? "bg-gray-200" : "bg-gray-700"
      } py-2 rounded grid grid-cols-3 gap-4`}
    >
      {repos.map((repo) => (
        <li
          key={repo.id}
          className={`${
            theme === "light" ? "bg-gray-300" : "bg-gray-800"
          } my-4 p-2 rounded font-bold flex flex-col items-center`}
        >
          <p className="text-xl">{repo.name}</p>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500"
          >
            Ir al repositorio
          </a>
        </li>
      ))}
    </ul>
  );
}

export default ReposList;
