import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';

import { getUserByUsername } from '../utils/api';

export default function LogIn() {
  const { user, setUser } = useContext(UserContext);

  console.log(user, 'user');

  return (
    <main>
      <Typography variant="h2">Log In</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target[0].value;

          getUserByUsername(username)
            .then((user) => {
              setUser(user);
            })
            .catch((err) => {
              console.log(err.msg);
            });
        }}
      >
        <FormControl>
          <TextField label="Username" variant="outlined" required></TextField>
          <Button variant="contained" type="submit">
            Log In
          </Button>
        </FormControl>
      </form>
    </main>
  );
}
