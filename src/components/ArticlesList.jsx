import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ArticleCard from './ArticleCard';
import { getArticles } from '../utils/api';
import { useParams } from 'react-router-dom';

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
          return <ArticleCard article={{ ...article }} />;
        })}
      </div>
    </main>
  );
}
