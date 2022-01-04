import React, { useState } from "react";

import { postArticle } from "../utils/api";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function CreateArticle({
  topics,
  author,
  setArticles,
  setOpen,
}) {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      title: title,
      author: author,
      topic: topic,
      body: article,
    };
    console.log(body);

    postArticle(body).then((article) => {
      setArticles((currentArticles) => {
        return [article, ...currentArticles];
      });
      setOpen(false);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ml: -5,
      }}
    >
      <Typography variant="h2">Post an article</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            required
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="select-topic">Topic</InputLabel>
            <Select
              required
              labelId="select-topic"
              label="Topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            >
              {topics.map((topic) => {
                return (
                  <MenuItem key={topic.slug} value={topic.slug}>
                    {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            required
            label="Article"
            variant="outlined"
            multiline
            rows={5}
            value={article}
            onChange={(e) => {
              setArticle(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Button fullWidth variant="contained" type="submit">
            Post Article
          </Button>
        </Box>
      </form>
    </Box>
  );
}
