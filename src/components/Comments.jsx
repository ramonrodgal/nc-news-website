import { useEffect, useState } from 'react';
import { getComments } from '../utils/api';
import Comment from './Comment';

export default function Comments({ article_id, articleAuthor }) {
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
