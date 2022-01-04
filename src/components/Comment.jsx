import { useState, useEffect, useContext } from "react";
import {
  getUserByUsername,
  deleteComment,
  updateCommentVotes,
} from "../utils/api";

import Voter from "./Voter";
import Loading from "./Loading";

import { UserContext } from "../contexts/UserContext";

import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

  if (isLoading) return <Loading />;

  if (isDeleted) return null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Link to={`/users/${author.username}`}>
            <Avatar sx={{ m: 1 }} alt={author.name} src={author.avatar_url} />
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              direction: "row",
            }}
          >
            <Link to={`/users/${author.username}`}>
              <Typography variant="subtitle1" sx={{ m: 1 }}>
                {author.username}
              </Typography>
            </Link>
            <Typography variant="subtitle1" sx={{ m: 1 }}>
              {new Date(comment.created_at).toDateString()}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body">{comment.body}</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {isLoggedIn === true ? (
          <Voter
            id={comment.comment_id}
            votes={votes}
            setVotes={setVotes}
            updateVotes={updateCommentVotes}
          />
        ) : null}
        {user.username === articleAuthor || user.username === comment.author ? (
          <Box>
            <Button
              color="secondary"
              onClick={() => {
                setOpen(true);
              }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        ) : null}
      </CardActions>

      {/* Alert Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove comment?"}</DialogTitle>
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
    </Card>
  );
}
