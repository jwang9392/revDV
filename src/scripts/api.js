import axios from 'axios';

export const fetchData = zip => {
  return axios.get(`/NYODQ/${zip}`).then(response => {
    console.log(response.data)
    return response.data
  })
};

export const fetchZipData = () => {
  return axios.get("../../NY_zip_lat_long.json").then(res => {
    let newObj = {};

    res.data.forEach(element => {
      newObj[element.fields.zip] = [element.fields.latitude, element.fields.longitude];
    });
debugger
    return newObj;
  })
};