import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserByUsername } from "../utils/api";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CommentIcon from "@mui/icons-material/Comment";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import Voter from "./Voter";

export default function ArticleCard({ article }) {
  const [author, setAuthor] = useState({});
  const [votes, setVotes] = useState(article.votes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserByUsername(article.author)
      .then((author) => {
        setAuthor(author);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article.author]);

  console.log(votes);

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card sx={{ height: "400px" }}>
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <Link to={`/articles/${article.topic}/${article.article_id}`}>
                <h2>{article.title}</h2>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <p>{article.topic}</p>
            </Grid>
            <Link to={`/users/${article.author}`}>
              <Avatar alt={author.name} src={author.avatar_url} />
            </Link>
            <p>
              <Link to={`/users/${article.author}`}>{article.author}</Link> -{" "}
              {new Date(article.created_at).toDateString()}
            </p>

            <p>{article.body.slice(0, 200)}...</p>
          </Grid>
        </CardContent>
        <CardActions>
          <Voter votes={votes} setVotes={setVotes} />
          <div>
            <p>
              <CommentIcon /> {article.comment_count}
            </p>
          </div>
          <Link to={`/articles/${article.topic}/${article.article_id}`}>
            <Button size="small" variant="contained">
              Read More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
