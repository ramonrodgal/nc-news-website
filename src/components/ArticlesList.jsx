import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ArticleCard from './ArticleCard';
import { getArticles } from '../utils/api';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [sortBy, setSortBy] = useState();
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic, sortBy)
      .then((articles) => {
        setArticles(articles);
        setIsloading(false);
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  }, [topic, sortBy]);

  if (isLoading) {
    return (
      <main>
        <CircularProgress />
      </main>
    );
  }

  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <NavBar topic={topic} sortBy={sortBy} setSortBy={setSortBy} />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {articles.map((article) => {
            return (
              <Grid key={article.article_id} item xs={12} md={6}>
                <ArticleCard article={{ ...article }} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </main>
  );
}
