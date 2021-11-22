import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/">
        <Typography variant="h1">NC News</Typography>
      </Link>
    </header>
  );
}
