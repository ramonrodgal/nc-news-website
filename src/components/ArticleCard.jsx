import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserByUsername } from '../utils/api';

import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

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
    <Card>
      <CardContent>
        <h2>{article.title}</h2>
        <Link to={`users/${article.author}`}>
          <Avatar alt={author.name} src={author.avatar_url} />
        </Link>
        <p>
          Author: <Link to={`users/${article.author}`}>{article.author}</Link> -{' '}
          {article.created_at}
        </p>
        <p>Votes: {article.votes}</p>
        <p>{article.topic}</p>
        <p>{article.body}</p>
      </CardContent>
      <CardActions>
        <Link to={`/articles/${article.topic}/${article.article_id}`}>
          <Button size="small" variant="contained">
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
