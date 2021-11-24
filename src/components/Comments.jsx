import { useEffect, useState } from 'react';
import { getComments } from '../utils/api';
import Comment from './Comment';

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
}
