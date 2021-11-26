import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserByUsername } from '../utils/api';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <h2>{article.title}</h2>
            </Grid>
            <Grid item xs={2}>
              <p>{article.topic}</p>
              <p>Votes: {article.votes}</p>
            </Grid>
            <Link to={`users/${article.author}`}>
              <Avatar alt={author.name} src={author.avatar_url} />
            </Link>
            <p>
              <Link to={`users/${article.author}`}>{article.author}</Link> -{' '}
              {new Date('2020-11-22T11:13:00.000Z').toDateString()}
            </p>

            <p>{article.body.slice(0, 200)}...</p>
          </Grid>
        </CardContent>
        <CardActions>
          <Link to={`/articles/${article.topic}/${article.article_id}`}>
            <Button size="small" variant="contained">
              Read More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
