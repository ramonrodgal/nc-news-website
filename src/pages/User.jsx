import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ArticlesList from "./ArticlesList";
import NotFound from "../components/NotFound";

import { getUserByUsername } from "../utils/api";

import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    getUserByUsername(username)
      .then((user) => {
        setIsloading(false);
        setUser(user);
        setIsError(false);
      })
      .catch((err) => {
        setIsloading(false);
      });
  }, [username]);

  if (isLoading)
    return (
      <main>
        <CircularProgress />
      </main>
    );

  if (isError)
    return (
      <main>
        <NotFound />
      </main>
    );

  return (
    <main>
      <Avatar alt={user.name} src={user.avatar_url} />
      <h2>{user.username}</h2>
      <h2>Articles</h2>
      <ArticlesList author={username} />
    </main>
  );
}
