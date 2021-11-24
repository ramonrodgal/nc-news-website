import { useEffect, useState, useContext } from 'react';
import { getComments, postComment } from '../utils/api';
import Comment from './Comment';

import { UserContext } from '../contexts/UserContext';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function Comments({ article_id, articleAuthor }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(UserContext);

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

  const handlePostComment = () => {
    const body = {
      username: user.username,
      body: newComment,
    };
    postComment(article_id, body)
      .then((comment) => {
        setComments([comment, ...comments]);
      })
      .catch((err) => {
        console.lod(err);
      });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Comments</h2>
      {user.username ? (
        <FormControl>
          <TextField
            id="outlined-textarea"
            label="Write a comment"
            multiline
            onBlur={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <Button
            onClick={handlePostComment}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </FormControl>
      ) : null}
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
