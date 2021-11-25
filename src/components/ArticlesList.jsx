import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ArticleCard from './ArticleCard';
import { getArticles } from '../utils/api';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic)
      .then((articles) => {
        setArticles(articles);
        setIsloading(false);
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  }, [topic]);

  if (isLoading) {
    return (
      <main>
        <CircularProgress />
      </main>
    );
  }

  return (
    <main>
      <NavBar topic={topic} />
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
