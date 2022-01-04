import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import UserAccountMenu from "./UserAccountMenu";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

import Modal from "@mui/material/Modal";
import LogIn from "./LogIn";

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
};

export default function Header() {
  const { isLoggedIn } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <Button variant="contained" onClick={handleOpen}>
                Login
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <LogIn setOpen={setOpen} />
        </Box>
      </Modal>
    </header>
  );
}
