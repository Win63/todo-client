import axios from 'axios';

const Client = axios.create({
  baseURL: 'https://todo-srv.onrender.com', // base URL of the API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Client;