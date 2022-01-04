import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <Box
        sx={{
          m: "auto",
          p: 10,
        }}
      >
        <Card sx={{ p: 5 }}>
          <Box>
            <Typography variant="h2">
              <BugReportIcon sx={{ width: 50, height: 50 }} /> OOPS!
            </Typography>
            <Typography variant="h3">Error 404: Page Not Found :(</Typography>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography variant="h4">Please check the URL.</Typography>
            <Typography variant="h4">
              Otherwise,{" "}
              <Link to="/">
                <b>click here</b>
              </Link>{" "}
              to be redirected to the homepage.
            </Typography>
          </Box>
        </Card>
      </Box>
    </main>
  );
}
