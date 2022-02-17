import api from './instance';

export const BREED_SEARCH_PATH = '/breeds/search';

export const getBreed = (name) => {
  return api.get(BREED_SEARCH_PATH, { params: { q: name } });
};

export const getImage = (imgId) => {
  return api.get(`/images/${imgId}`);
};
