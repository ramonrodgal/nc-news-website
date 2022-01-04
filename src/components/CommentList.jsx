import { useEffect, useState, useContext } from "react";
import { getComments, postComment } from "../utils/api";

import Comment from "./Comment";
import Loading from "../components/Loading";

import { UserContext } from "../contexts/UserContext";

import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CommentList({ article_id, articleAuthor }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [comment, setComment] = useState("");
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
        setComment("");
        setIsPosting(false);
      })
      .catch((err) => {
        console.lod(err);
        setIsPosting(false);
      });
  };

  if (isLoading) return <Loading />;

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h3">Comments</Typography>
      {user.username ? (
        <form onSubmit={handlePostComment}>
          <FormControl fullWidth>
            <TextField
              id="outlined-textarea"
              label="Write a comment"
              multiline
              rows={4}
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
    </Box>
  );
}
