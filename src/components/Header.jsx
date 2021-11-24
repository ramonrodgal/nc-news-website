import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, isLoggedIn, setUser } = useContext(UserContext);

  console.log(isLoggedIn);

  return (
    <header>
      <Link to="/">
        <Typography variant="h1">NC News</Typography>
      </Link>
      {isLoggedIn ? (
        <>
          <Avatar alt={user.name} src={user.avatar_url}></Avatar>
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
        <>
          <Link to="/login">
            <Button variant="contained">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="contained">Sign Up</Button>
          </Link>
        </>
      )}
    </header>
  );
}
