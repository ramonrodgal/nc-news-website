import React from "react";
import Typography from "@mui/material/Typography";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Typography variant="div">
        <Typography variant="h2">
          <BugReportIcon /> OOPS!
        </Typography>
        <Typography variant="h3">Error 404: Page Not Found :(</Typography>
      </Typography>
      <Typography variant="div">
        <Typography variant="h4">Please check the URL.</Typography>
        <Typography variant="h4">
          Otherwise, <Link to="/">click here</Link> to be redirected to the
          homepage.
        </Typography>
      </Typography>
    </>
  );
}
