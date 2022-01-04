import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

import { getUserByUsername } from "../utils/api";

export default function LogIn({ setOpen }) {
  const { setUser } = useContext(UserContext);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;

    getUserByUsername(username)
      .then((user) => {
        setUser(user);
        setOpen(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Login
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              label="Username"
              variant="outlined"
              placeholder="jessjelly"
              required
              onChange={() => setIsError(false)}
            ></TextField>
            <Button variant="contained" type="submit">
              Log In
            </Button>
          </FormControl>
        </form>
      </Box>
      {isError ? <p className="error-message">Invalid username</p> : null}
    </>
  );
}
