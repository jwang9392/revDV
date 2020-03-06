import axios from 'axios';

export const fetchData = zip => {
  return axios.get(`/NYODQ/${zip}`).then(response => {
    console.log(response.data)
    return response.data
  })
};