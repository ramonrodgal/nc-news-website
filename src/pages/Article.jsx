import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import ArticleCard from "../components/ArticleCard";
import CommentList from "../components/CommentList";
import NotFound from "../components/NotFound";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/system/Box";

export default function Article() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading)
    return (
      <main>
        <CircularProgress />
      </main>
    );

  if (isError)
    return (
      <main>
        <NotFound />
      </main>
    );

  return (
    <main>
      <Box sx={{ mt: 2 }}>
        <ArticleCard article={{ ...article }} />
      </Box>
      <CommentList article_id={article_id} articleAuthor={article.author} />
    </main>
  );
}
