import { useState, useEffect } from 'react';
import { getUserByUsername } from '../utils/api';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

export default function ArticleCard({ article }) {
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserByUsername(article.author)
      .then((author) => {
        setAuthor(author);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article.author]);

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <h2>{article.title}</h2>
      <Avatar alt={author.name} src={author.avatar_url} />
      <p>
        {article.author} - {article.created_at}
      </p>
      <p>Votes: {article.votes}</p>
      <p>{article.topic}</p>
      <p>{article.body}</p>
    </div>
  );
}
