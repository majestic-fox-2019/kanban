import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://learnkanban.herokuapp.com/',
});

export default instance