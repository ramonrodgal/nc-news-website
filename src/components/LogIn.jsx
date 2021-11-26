import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';

import { getUserByUsername } from '../utils/api';

export default function LogIn() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;

    getUserByUsername(username)
      .then((user) => {
        setUser(user);
        setIsError(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err.msg);
        setIsError(true);
        //Incorrect username
      });
  };

  return (
    <main>
      <Typography variant="h2">Log In</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            label="Username"
            variant="outlined"
            placeholder="jessjelly"
            required
          ></TextField>
          <Button variant="contained" type="submit">
            Log In
          </Button>
        </FormControl>
      </form>
      {isError ? <p>Invalid username</p> : null}
    </main>
  );
}
