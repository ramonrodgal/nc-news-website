import { useState, useEffect, useContext } from 'react';
import { getUserByUsername } from '../utils/api';

import { UserContext } from '../contexts/UserContext';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Comment({ comment, articleAuthor }) {
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(comment.author)
      .then((user) => {
        setAuthor(user);
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
      <Avatar alt={author.name} src={author.avatar_url} />
      <h3>{author.username}</h3>
      <h4>Created at: {comment.created_at}</h4>
      {user.username === articleAuthor || user.username === comment.author ? (
        <DeleteIcon />
      ) : null}
      <p>{comment.body}</p>
      <p>Votes:{comment.votes}</p>
    </div>
  );
}
