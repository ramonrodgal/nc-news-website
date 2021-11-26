import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, isLoggedIn, setUser } = useContext(UserContext);

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={10}>
            <Link to="/">
              <Typography variant="h1">NC News</Typography>
            </Link>
          </Grid>
          <Grid item xs={2}>
            {isLoggedIn ? (
              <>
                <Link to={`/users/${user.username}`}>
                  <Avatar alt={user.name} src={user.avatar_url}></Avatar>
                </Link>
                <p>{user.username}</p>
                <Button
                  variant="contained"
                  onClick={() => {
                    setUser({});
                  }}
                >
                  logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="contained">Log In</Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
    </header>
  );
}
