import React, { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext";

function Posts() {
  const [userPosts, setUserPosts] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setUserPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {userPosts.map((post) => {
        return (
          <div
            key={post.id}
            className={
              theme === "light"
                ? "bg-white flex flex-col h-full rounded-lg overflow-hidden border-1 border-gray-800"
                : "bg-gray-800 flex flex-col h-full rounded-lg overflow-hidden border-1 border-gray-50"
            }
          >
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p>{post.body}</p>
            </div>
            <div
              className={
                theme === "light"
                  ? "bg-gray-200 px-6 py-3 border-gray-100"
                  : "bg-gray-700 px-6 py-3 border-gray-100"
              }
            >
              <span className="text-xs">
                Post ID: {post.id} - User ID: {post.userId || "N/A"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
