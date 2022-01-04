import { useState, useEffect } from "react";

import { getTopics } from "../utils/api";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import Loading from "./Loading";
import CreateArticle from "./CreateArticle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  mx: 2,
};

export default function NavBar({
  setArticles,
  setTopic,
  author,
  topic = "",
  sortBy = "",
  setSortBy,
}) {
  const [topics, setTopics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn } = useContext(UserContext);
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    return <Loading />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <FormControl sx={{ width: 100, m: 2 }} variant="filled">
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
        <FormControl sx={{ width: 100, m: 2 }} variant="filled">
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
      </Box>
      {isLoggedIn === true ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            direction: "row",
          }}
        >
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Create Post
          </Button>
        </Box>
      ) : null}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateArticle
            topics={topics}
            author={user.username}
            setArticles={setArticles}
            setOpen={setOpen}
          />
        </Box>
      </Modal>
    </Box>
  );
}
