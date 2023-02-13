import axios from '../utils/index';

export const userApis = {
  signin: async ({ email, password }) => {
    const response = await axios.post('/auth/signin', { email, password });
    return response.data;
  },
  signup: async ({ email, password }) => {
    const response = await axios.post('/auth/signup', { email, password });
    return response.data;
  },
};
