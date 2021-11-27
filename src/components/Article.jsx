import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getArticleById,
  updateArticleVotes,
  getUserByUsername,
} from '../utils/api';
import CommentList from './CommentList';
import NotFound from './NotFound';
import { UserContext } from '../contexts/UserContext';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Article() {
  const { article_id } = useParams();
  const { user, isLoggedIn } = useContext(UserContext);

  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);

        setVotes(article.votes);
        return getUserByUsername(article.author).then((author) => {
          setAuthor(author);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (vote) => {
    setVotes((prevVotes) => prevVotes + vote);
    updateArticleVotes(article_id, vote)
      .then((article) => {
        console.log(article.votes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={2}>
            {isLoggedIn === true && user.username !== article.author ? (
              <Button onClick={() => handleVote(1)}>
                <ArrowUpwardIcon />
              </Button>
            ) : null}

            <p>Votes:{votes}</p>

            {isLoggedIn === true && user.username !== article.author ? (
              <Button onClick={() => handleVote(-1)}>
                <ArrowDownwardIcon />
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={10}>
            <Grid container>
              <Grid item xs={12} sm={10}>
                <h2>{article.title}</h2>
              </Grid>
              <Grid item xs={12} sm={2}>
                <h3>{article.topic}</h3>
              </Grid>
              <Grid item xs={12}>
                <Link to={`/users/${article.author}`}>
                  <Avatar alt={author.name} src={author.avatar_url} />
                </Link>
                <p>
                  <Link to={`/users/${article.author}`}>{article.author}</Link>{' '}
                  - created at {new Date(article.created_at).toDateString()}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>{article.body}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CommentList
              article_id={article_id}
              articleAuthor={article.author}
            />
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
