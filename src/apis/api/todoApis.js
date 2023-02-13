import axios from '../utils/index';

export const todoApis = {
  getTodo: async () => {
    const response = await axios.get('/todos');
    return response.data;
  },
  createTodo: async ({ todo }) => {
    const response = await axios.post('/todos', { todo });
    return response.data;
  },
  updateTodo: async (id, { todo, isCompleted }) => {
    const response = await axios.put(`/todos/${id}`, { todo, isCompleted });
    return response.data;
  },
  deleteTodo: async (id) => {
    const response = await axios.delete(`/todos/${id}`);
    return response.data;
  },
};
