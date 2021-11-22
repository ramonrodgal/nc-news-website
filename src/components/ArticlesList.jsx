import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ArticleCard from './ArticleCard';
import { getArticles } from '../utils/api';
import { useParams, Link } from 'react-router-dom';

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { topic } = useParams();

  console.log(topic);

  useEffect(() => {
    getArticles(topic).then((articles) => {
      setArticles(articles);
      setIsloading(false);
    });
  }, [topic]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <main>
      <NavBar />
      <div>
        {articles.map((article) => {
          return (
            <Link to={`/articles/${article.topic}/${article.article_id}`}>
              <ArticleCard key={article.article_id} article={{ ...article }} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
