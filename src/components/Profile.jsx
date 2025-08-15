import React, { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext";
const username = import.meta.env.VITE_GITHUB_USER;
const token = import.meta.env.VITE_GITHUB_TOKEN;

function Profile() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getProfile();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (profile.length) return <p>Cargando...</p>;

  return (
    <div>
      {profile.name && (
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex justify-center items-center">
            <img
              src={profile.avatar_url}
              alt="image avatar"
              className="w-[150px] rounded-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p
                className={
                  theme === "light"
                    ? "text-xl text-gray-600"
                    : "text-xl text-gray-400"
                }
              >
                {profile.login}
              </p>
            </div>
            <p>
              Followers: {profile.followers} · Following: {profile.following}
            </p>
            <div className="flex">
              <svg
                class="octicon octicon-location"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
                fill={theme === "light" ? "black" : "white"}
                className="flex justify-center items-center w-4"
              >
                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
              </svg>
              <p className="mx-2">{profile.location}</p>
            </div>
            <div className="flex">
              <svg
                class="octicon octicon-mail"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
                fill={theme === "light" ? "black" : "white"}
                className="flex justify-center items-center w-4"
              >
                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"></path>
              </svg>
              <p className="mx-2">{profile.email}</p>
            </div>
            <p>Account created: {profile.created_at.slice(0, 10)}</p>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-2 mt-6">
        <a
          href="https://www.linkedin.com/in/mayron-castillo/"
          target="_blank"
          className={
            theme === "light"
              ? "bg-gray-300 hover:bg-gray-400 rounded p-2 text-center"
              : "bg-gray-800 hover:bg-gray-900 rounded p-2 text-center"
          }
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/Mayron-Castillo"
          target="_blank"
          className={
            theme === "light"
              ? "bg-gray-300 hover:bg-gray-400 rounded p-2 text-center"
              : "bg-gray-800 hover:bg-gray-900 rounded p-2 text-center"
          }
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Profile;
