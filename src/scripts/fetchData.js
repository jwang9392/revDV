import axios from 'axios';

export const fetchData = zip => {
  return axios.get(`/NYODQ/${zip}`)
};