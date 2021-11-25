import { useEffect, useState, useContext } from 'react';
import { getComments, postComment } from '../utils/api';
import Comment from './Comment';

import { UserContext } from '../contexts/UserContext';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function Comments({ article_id, articleAuthor }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
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
        setIsloading(false);
      });
  }, [article_id]);

  const handlePostComment = () => {
    setIsPosting(true);
    const body = {
      username: user.username,
      body: newComment,
    };
    postComment(article_id, body)
      .then((comment) => {
        setNewComment('');
        setComments([comment, ...comments]);
        setIsPosting(false);
      })
      .catch((err) => {
        console.lod(err);
        setIsPosting(false);
      });
  };

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <h2>Comments</h2>
      {user.username ? (
        <FormControl>
          <TextField
            id="outlined-textarea"
            label="Write a comment"
            multiline
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
          />
          <LoadingButton
            onClick={handlePostComment}
            endIcon={<SendIcon />}
            loading={isPosting}
            loadingPosition="end"
            variant="contained"
          >
            Send
          </LoadingButton>
          <Button variant="contained" endIcon={<SendIcon />}>
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
