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
          <Link to={`/articles/${article.topic}/${article.article_id}`}>
            <Typography variant="h2">{article.title}</Typography>
          </Link>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Link to={`/users/${article.author}`}>
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
              <Link to={`/users/${article.author}`}>
                <Typography variant="subtitle1" sx={{ m: 1 }}>
                  {article.author}
                </Typography>
              </Link>
              <Typography variant="subtitle1" sx={{ m: 1 }}>
                {new Date(article.created_at).toDateString()}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body">{article.body}</Typography>
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
              id={article.article_id}
              votes={votes}
              setVotes={setVotes}
              updateVotes={updateArticleVotes}
            />
          ) : null}
          <Box>
            <CommentIcon /> {article.comment_count}
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
