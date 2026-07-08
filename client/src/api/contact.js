import api from './axios';

export const submitContact = (data) => api.post('/api/contact', data);
