import { useState, useEffect, useContext } from 'react';
import {
  getUserByUsername,
  deleteComment,
  updateCommentVotes,
} from '../utils/api';

import { UserContext } from '../contexts/UserContext';

import { Link } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Comment({ comment, articleAuthor }) {
  const { user, isLoggedIn } = useContext(UserContext);

  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isDeleted, setIsdeleted] = useState(false);
  const [votes, setVotes] = useState(comment.votes);

  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(comment.author)
      .then((user) => {
        setAuthor(user);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [comment.author]);

  const handleDelete = () => {
    setOpen(false);
    deleteComment(comment.comment_id)
      .then((response) => {
        setIsdeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVote = (vote) => {
    setVotes((prevVotes) => prevVotes + vote);
    updateCommentVotes(comment.comment_id, vote).then((comment) => {});
  };

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  if (isDeleted) return null;

  return (
    <div>
      <Link to={`/users/${author.username}`}>
        <Avatar alt={author.name} src={author.avatar_url} />
        <h3>{author.username}</h3>
      </Link>
      <h4>Created at: {comment.created_at}</h4>
      {user.username === articleAuthor || user.username === comment.author ? (
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <DeleteIcon />
        </Button>
      ) : null}
      <p>{comment.body}</p>
      <p>Votes:{votes}</p>
      {isLoggedIn === true ? (
        <>
          <Button onClick={() => handleVote(1)}>
            <ArrowUpwardIcon />
          </Button>
          <Button onClick={() => handleVote(-1)}>
            <ArrowDownwardIcon />
          </Button>{' '}
        </>
      ) : null}

      {/* Alert window */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Remove comment?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this comment? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
