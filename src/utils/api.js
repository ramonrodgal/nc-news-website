import axios from 'axios';

const marketplaceApi = axios.create({
  baseURL: 'https://be-nc-news-api.herokuapp.com/api/',
});

export const getTopics = () => {
  return marketplaceApi.get('/topics').then((res) => {
    return res.data.topics;
  });
};
