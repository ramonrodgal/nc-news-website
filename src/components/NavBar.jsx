import { useState, useEffect } from 'react';
//API functions
import { getTopics } from '../utils/api';
import { useNavigate } from 'react-router';

import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function NavBar({ topic = '' }) {
  const [topics, setTopics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="select-topic">Topic</InputLabel>
      <Select
        labelId="select-topic"
        label="Topic"
        value={topic}
        onChange={(e) => {
          navigate(`/articles/${e.target.value}`);
        }}
      >
        {topics.map((topic) => {
          return (
            <MenuItem key={topic.slug} value={topic.slug}>
              {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
