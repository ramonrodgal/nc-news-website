import { useEffect, useState, useContext } from 'react';
import { getComments, postComment } from '../utils/api';
import Comment from './Comment';

import { UserContext } from '../contexts/UserContext';

import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

export default function CommentList({ article_id, articleAuthor }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    getComments(article_id)
      .then((comments) => {
        setIsloading(false);
        setComments(comments.sort((a, b) => b.votes - a.votes));
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
        setComments((currentComments) => {
          return [comment, ...currentComments];
        });
        setComment('');
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px',
          }}
        >
          <form onSubmit={handlePostComment}>
            <FormControl>
              <TextField
                id="outlined-textarea"
                label="Write a comment"
                multiline
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <LoadingButton
                type="submit"
                endIcon={<SendIcon />}
                loading={isPosting}
                loadingPosition="end"
                variant="contained"
                sx={{ margin: '10px' }}
              >
                Send
              </LoadingButton>
            </FormControl>
          </form>
        </Box>
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
