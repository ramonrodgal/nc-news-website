import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Typography from "@mui/material/Typography";

export default function Voter({ votes, setVotes }) {
  const handleUpVote = () => {
    setVotes((prevState) => {
      return prevState + 1;
    });
  };

  const handleDownVote = () => {
    setVotes((prevState) => {
      return prevState - 1;
    });
  };

  return (
    <div>
      <IconButton onClick={handleUpVote}>
        <ArrowUpwardIcon />
      </IconButton>
      <Typography variant="p">{votes}</Typography>
      <IconButton onClick={handleDownVote}>
        <ArrowDownwardIcon />
      </IconButton>
    </div>
  );
}
