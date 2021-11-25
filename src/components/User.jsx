import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ArticleCard from './ArticleCard';

import { getUserByUsername, getArticlesByUsername } from '../utils/api';

import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getUserByUsername(username)
      .then((user) => {
        setUser(user);
        getArticlesByUsername(user.username).then((articles) => {
          setArticles(articles);
        });
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
      <div>
        {articles.map((article) => {
          return (
            <ArticleCard key={article.article_id} article={{ ...article }} />
          );
        })}
      </div>
    </main>
  );
}
