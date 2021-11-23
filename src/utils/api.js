import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: 'https://be-nc-news-api.herokuapp.com/api/',
});

export const getTopics = () => {
  return ncNewsApi.get('/topics').then((res) => {
    return res.data.topics;
  });
};

export const getArticles = (topic) => {
  return ncNewsApi
    .get('/articles', {
      params: {
        topic: topic,
      },
    })
    .then((res) => {
      return res.data.articles;
    });
};

export const getArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getComments = (article_id) => {
  return ncNewsApi.get(`articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const getUserByUsername = (username) => {
  return ncNewsApi.get(`users/${username}`).then((res) => {
    return res.data.user;
  });
};
