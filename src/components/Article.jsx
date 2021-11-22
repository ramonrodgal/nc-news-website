import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../utils/api';

export default function Article() {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
    });
  }, []);

  return (
    <main>
      <h2>{article.title}</h2>
      <h3>{article.topic}</h3>
      <p>
        {article.author} - created at {article.created_at}
      </p>
      <p>{article.body}</p>
      <p>Votes:{article.votes}</p>
    </main>
  );
}
