import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { getArticles } from '../utils/api';

export default function ArticlesList() {
  const [topic, setTopic] = useState(undefined);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsloading] = useState(true);

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
      <NavBar setTopic={setTopic} />
      <div>
        {articles.map((article) => {
          return <p key={article.title}>{article.title}</p>;
        })}
      </div>
    </main>
  );
}
