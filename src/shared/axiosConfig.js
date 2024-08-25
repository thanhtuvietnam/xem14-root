import axios from 'axios';
import { API_URL } from './constant';

const instance = axios.create({
  baseURL: API_URL,
  headers: { 'X-Custom-Header': 'foobar' },
  // params: {
  //   api_key: '134ed9eaef855eca48b2ff3096debe63',
  // },
});

// console.log(instance)
export default instance;
