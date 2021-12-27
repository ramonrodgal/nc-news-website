import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { getUserByUsername, updateArticleVotes } from "../utils/api";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CommentIcon from "@mui/icons-material/Comment";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Voter from "./Voter";

export default function ArticleCard({ article, setTopic }) {
  const { isLoggedIn } = useContext(UserContext);

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

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardContent>
          <Typography variant="p">
            <Link
              to={`/articles/${article.topic}`}
              onClick={() => setTopic(article.topic)}
            >
              {article.topic}
            </Link>
          </Typography>
          <Link to={`/articles/${article.topic}/${article.article_id}`}>
            <Typography variant="h2">{article.title}</Typography>
          </Link>
          <Link to={`/users/${article.author}`}>
            <Avatar alt={author.name} src={author.avatar_url} />
          </Link>
          <p>
            <Link to={`/users/${article.author}`}>{article.author}</Link> -{" "}
            {new Date(article.created_at).toDateString()}
          </p>

          <p>{article.body.slice(0, 200)}...</p>
        </CardContent>
        <CardActions>
          {isLoggedIn === true ? (
            <Voter
              id={article.article_id}
              votes={votes}
              setVotes={setVotes}
              updateVotes={updateArticleVotes}
            />
          ) : null}
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
