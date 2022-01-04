import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/system/Box";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "row",
        mt: "40%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
