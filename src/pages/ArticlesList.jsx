import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import NotFound from "../components/NotFound";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";
import { getArticles } from "../utils/api";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function ArticlesList({ author }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [sortBy, setSortBy] = useState();
  const [topic, setTopic] = useState(useParams().topic);

  useEffect(() => {
    getArticles(topic, sortBy, author)
      .then((articles) => {
        setArticles(articles);
        setIsloading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsloading(false);
      });
  }, [topic, sortBy, author]);

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <NavBar
              author={author}
              topic={topic}
              sortBy={sortBy}
              setSortBy={setSortBy}
              setTopic={setTopic}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {articles.map((article) => {
            return (
              <Grid key={article.article_id} item xs={12}>
                <ArticleCard
                  key={article.article_id}
                  article={{ ...article }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </main>
  );
}
