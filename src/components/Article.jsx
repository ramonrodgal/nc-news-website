import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../utils/api';
import Comments from '../components/Comments';

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

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
      <p>Votes:{article.votes}</p>
      <Comments article_id={article_id} articleAuthor={article.author} />
    </main>
  );
}
