import { useState, useEffect, useContext } from 'react';
import { getUserByUsername, deleteComment } from '../utils/api';

import { UserContext } from '../contexts/UserContext';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Comment({ comment, articleAuthor }) {
  const { user } = useContext(UserContext);
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isDeleted, setIsdeleted] = useState(false);

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
  }, []);

  const removeComment = (comment_id) => {
    deleteComment(comment_id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    removeComment(comment.comment_id);
    setOpen(false);
    setIsdeleted(true);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isDeleted) return null;

  return (
    <div>
      <Avatar alt={author.name} src={author.avatar_url} />
      <h3>{author.username}</h3>
      <h4>Created at: {comment.created_at}</h4>
      {user.username === articleAuthor || user.username === comment.author ? (
        <Button onClick={handleClickOpen}>
          <DeleteIcon />
        </Button>
      ) : null}
      <p>{comment.body}</p>
      <p>Votes:{comment.votes}</p>
      <Dialog
        open={open}
        onClose={handleCancel}
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
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
