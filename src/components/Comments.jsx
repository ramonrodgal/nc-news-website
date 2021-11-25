import { useEffect, useState, useContext } from 'react';
import { getComments, postComment } from '../utils/api';
import Comment from './Comment';

import { UserContext } from '../contexts/UserContext';

import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function Comments({ article_id, articleAuthor }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
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

  const handlePostComment = (e) => {
    e.preventDefault();
    const newComment = e.target[0].value;
    setIsPosting(true);
    const body = {
      username: user.username,
      body: newComment,
    };
    postComment(article_id, body)
      .then((comment) => {
        e.target[0].value = '';
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
        <form onSubmit={handlePostComment}>
          <FormControl>
            <TextField
              id="outlined-textarea"
              label="Write a comment"
              multiline
            />
            <LoadingButton
              type="submit"
              endIcon={<SendIcon />}
              loading={isPosting}
              loadingPosition="end"
              variant="contained"
            >
              Send
            </LoadingButton>
          </FormControl>
        </form>
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
