import axios from 'axios';

export const getAllSheltersQuery = () => {
  return axios.get('http://localhost:8080/api/shelters');
};
