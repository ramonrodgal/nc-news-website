import { useState, useEffect } from 'react';
//API functions
import { getTopics } from '../utils/api';

export default function NavBar({ setTopic }) {
  const [topics, setTopics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
          setTopic(e.target.value);
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
