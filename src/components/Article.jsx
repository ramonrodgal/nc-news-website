import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  getArticleById,
  updateArticleVotes,
  getUserByUsername,
} from '../utils/api';
import Comments from '../components/Comments';
import { UserContext } from '../contexts/UserContext';

import CircularProgress from '@mui/material/CircularProgress';
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

  return (
    <main>
      <h2>{article.title}</h2>
      <h3>{article.topic}</h3>
      <Avatar alt={author.name} src={author.avatar_url} />
      <p>
        {article.author} - created at {article.created_at}
      </p>
      <p>{article.body}</p>
      <p>Votes:{votes}</p>
      {isLoggedIn === true && user.username !== article.author ? (
        <>
          <Button onClick={() => handleVote(1)}>
            <ArrowUpwardIcon />
          </Button>
          <Button onClick={() => handleVote(-1)}>
            <ArrowDownwardIcon />
          </Button>{' '}
        </>
      ) : null}

      <Comments article_id={article_id} articleAuthor={article.author} />
    </main>
  );
}
