import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, updateArticleVotes } from '../utils/api';
import Comments from '../components/Comments';
import { UserContext } from '../contexts/UserContext';

import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Article() {
  const { article_id } = useParams();
  const { user, isLoggedIn } = useContext(UserContext);

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
      setVotes(article.votes);
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
        <p>Loading...</p>
      </main>
    );

  return (
    <main>
      <h2>{article.title}</h2>
      <h3>{article.topic}</h3>
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
