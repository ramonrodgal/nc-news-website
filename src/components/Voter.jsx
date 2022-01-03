import React, { useState } from "react";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Typography from "@mui/material/Typography";

export default function Voter({ id, votes, setVotes, updateVotes }) {
  const [disableUpVote, setDisableUpVote] = useState(false);
  const [disableDownVote, setDisableDownVote] = useState(false);

  const handleUpVote = () => {
    setVotes((prevState) => {
      return prevState + 1;
    });
    setDisableUpVote(true);
    setDisableDownVote(false);
    updateVotes(id, 1);
  };

  const handleDownVote = () => {
    setVotes((prevState) => {
      return prevState - 1;
    });
    setDisableUpVote(false);
    setDisableDownVote(true);
    updateVotes(id, -1);
  };

  return (
    <div>
      <Button onClick={handleUpVote} disabled={disableUpVote}>
        <ArrowUpwardIcon />
      </Button>
      <Typography variant="p">{votes}</Typography>
      <Button onClick={handleDownVote} disabled={disableDownVote}>
        <ArrowDownwardIcon />
      </Button>
    </div>
  );
}
