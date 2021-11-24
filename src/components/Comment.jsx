import { useState, useEffect } from 'react';
import { getUserByUsername } from '../utils/api';

import Avatar from '@mui/material/Avatar';

export default function Comment({ comment }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(comment.author)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Avatar alt={user.name} src={user.avatar_url} />
      <h3>{user.username}</h3>
      <h4>Created at: {comment.created_at}</h4>
      <p>{comment.body}</p>
      <p>Votes:{comment.votes}</p>
    </div>
  );
}
