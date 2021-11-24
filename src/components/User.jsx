import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../utils/api';

import Avatar from '@mui/material/Avatar';

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserByUsername(username)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Avatar alt={user.name} src={user.avatar_url} />
      <h2>{user.username}</h2>
    </div>
  );
}
