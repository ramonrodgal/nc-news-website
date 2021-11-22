import { useState, useEffect } from 'react';
//API functions
import { getTopics } from '../utils/api';
import { useNavigate } from 'react-router';

export default function NavBar() {
  const [topics, setTopics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <select
        name="topics"
        onChange={(e) => {
          navigate(`/articles/${e.target.value}`);
        }}
      >
        <option disabled selected>
          Select topics
        </option>
        {topics.map((topic) => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
