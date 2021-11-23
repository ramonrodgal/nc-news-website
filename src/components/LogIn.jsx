import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';

import { getUserByUsername } from '../utils/api';

export default function LogIn() {
  const { setUser, isLoggedIn } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;

    getUserByUsername(username)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err.msg);
      });
  };

  return !isLoggedIn ? (
    <main>
      <Typography variant="h2">Log In</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField label="Username" variant="outlined" required></TextField>
          <Button variant="contained" type="submit">
            Log In
          </Button>
        </FormControl>
      </form>
    </main>
  ) : (
    <main>
      <h2>You are logged in!</h2>
      <Link to="/">
        <Button>Go to home page</Button>
      </Link>
    </main>
  );
}
