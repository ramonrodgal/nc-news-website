import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ArticlesList from "./ArticlesList";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";

import { getUserByUsername } from "../utils/api";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
        console.log(err);
      });
  }, [username]);

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={user.name}
          src={user.avatar_url}
          sx={{ width: 200, height: 200, mt: 2 }}
        />
        <Typography variant="h2" sx>
          {user.username}
        </Typography>
      </Box>
      <Typography variant="h3">Articles</Typography>
      <ArticlesList author={username} />
    </>
  );
}
