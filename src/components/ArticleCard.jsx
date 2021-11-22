import React from 'react';

export default function ArticleCard({ article }) {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>
        {article.author} - {article.created_at}
      </p>
      <p>Votes: {article.votes}</p>
      <p>{article.topic}</p>
      <p>{article.body}</p>
    </div>
  );
}
