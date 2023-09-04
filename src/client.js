import axios from 'axios';

const Client = axios.create({
  baseURL: 'https://jovial-marigold-efa6c9.netlify.app', // base URL of the API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Client;