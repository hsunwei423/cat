import api from "./instance";

export const getBreed = (name) => {
  return api.get('/breeds/search', { params: { q: name }});
};

export const getImage = imgId => {
  return api.get(`/images/${imgId}`);
};