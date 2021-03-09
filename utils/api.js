import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'project-id': '602a2f0deac5ef687b30ac21',
  },
});

export const fetchProjects = async () => {
  const response = await axiosInstance.get('project');
  return response.data;
};

export const fetchProjectLabels = async (projectId) => {
  const response = await axiosInstance.get(`project/${projectId}/labels`);
  return response.data;
};
