import { useEffect, useState } from 'react';
import { getComments } from '../utils/api';
import Comment from './Comment';

export default function Comments({ article_id, articleAuthor }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getComments(article_id)
      .then((comments) => {
        setIsloading(false);
        setComments(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.comment_id}
            comment={comment}
            articleAuthor={articleAuthor}
          />
        );
      })}
    </div>
  );
}
