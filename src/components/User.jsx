import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ArticlesList from './ArticlesList';

import { getUserByUsername } from '../utils/api';

import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getUserByUsername(username)
      .then((user) => {
        setUser(user);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, [username]);

  if (isLoading) return <CircularProgress />;

  return (
    <main>
      <Avatar alt={user.name} src={user.avatar_url} />
      <h2>{user.username}</h2>
      <h2>Articles</h2>
      <ArticlesList author={username} />
    </main>
  );
}
