import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Header() {
  return (
    <header>
      <Link to="/">
        <Typography variant="h1">NC News</Typography>
      </Link>
      <Link to="/login">
        <Button variant="contained">Log In</Button>
      </Link>
      <Link to="/signup">
        <Button variant="contained">Sign Up</Button>
      </Link>
    </header>
  );
}
