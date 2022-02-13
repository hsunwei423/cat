import api from "./instance";

export const getBreed = (name) => {
  return api.get('/breeds/search', { params: { q: name }})
}