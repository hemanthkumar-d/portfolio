import api from './axios';

export const getProjects = (params) => api.get('/api/projects', { params });

export const getProject = (id) => api.get(`/api/projects/${id}`);
