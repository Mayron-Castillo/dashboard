import React, { useEffect, useState } from "react";
const username = import.meta.env.VITE_GITHUB_USER;
const token = import.meta.env.VITE_GITHUB_TOKEN;

function Profile() {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) return <p>Hubo un error</p>;

  return (
    <div>
      {profile.name && (
        <div className="flex gap-4">
          <div className="flex justify-center items-center">
            <img
              src={profile.avatar_url}
              alt="image avatar"
              className="w-[150px] rounded-full"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-xl text-gray-600">{profile.login}</p>
            <p>{profile.bio}</p>
            <p>
              Followers: {profile.followers} · Following: {profile.following}
            </p>
            <p>{profile.location}</p>
            <p>{profile.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
