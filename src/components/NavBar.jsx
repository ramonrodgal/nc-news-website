import { useState, useEffect } from "react";
//API functions
import { getTopics } from "../utils/api";
import { useNavigate } from "react-router";

import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function NavBar({
  setTopic,
  author,
  topic = "",
  sortBy = "",
  setSortBy,
}) {
  const [topics, setTopics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="select-topic">Topic</InputLabel>
            <Select
              labelId="select-topic"
              label="Topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (!author) {
                  navigate(`/articles/${e.target.value}`);
                }
              }}
            >
              <MenuItem value={""}>All Topics</MenuItem>
              {topics.map((topic) => {
                return (
                  <MenuItem key={topic.slug} value={topic.slug}>
                    {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControl fullWidth variant="filled">
            <InputLabel>Sort by</InputLabel>
            <Select
              label="Sort by"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
            >
              <MenuItem value="created_at">Most recent</MenuItem>
              <MenuItem value="votes">Popular</MenuItem>
              <MenuItem value="comment_count">Controversial</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
