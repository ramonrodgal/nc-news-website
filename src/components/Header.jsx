import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import UserAccountMenu from "./UserAccountMenu";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={10}>
            <Link to="/">
              <Typography variant="h1">NC News</Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={2}
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              direction: "row",
            }}
          >
            {isLoggedIn ? (
              <UserAccountMenu />
            ) : (
              <Link to="/login">
                <Button variant="contained">Login</Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
    </header>
  );
}
