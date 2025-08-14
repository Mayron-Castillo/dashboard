import { useEffect, useState } from "react";

function ReposList() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const username = import.meta.env.VITE_GITHUB_USER;

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
      }
    };

    getRepos();
  }, [username, token]);

  if (error) return <p>Error: {error}</p>;
  if (!repos.length) return <p>Cargando...</p>;

  return (
    <ul className="bg-gray-300 p-2 rounded">
      {repos.map((repo) => (
        <li key={repo.id} className="bg-gray-400 my-4 p-2 rounded">
          <p className="text-xl">{repo.name}</p>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700"
          >
            Ir al repositorio
          </a>
        </li>
      ))}
    </ul>
  );
}

export default ReposList;
