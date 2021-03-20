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

export const fetchAnnotations = async (projectId, pipeline, page, pageSize) => {
  const response = await axiosInstance.post(
    `annotations/pipeline?page=${page}&page_size=${pageSize}`,
    pipeline,
    { headers: { 'project-id': projectId } },
  );

  return response.data;
};

export const fetchStagesJSONSchema = async (projectId) => {
  const response = await axiosInstance.get(
    '/annotations/meta/stages',
    { headers: { 'project-id': projectId } },
  );

  return response.data;
};

export const getSignedUrlForImageUpload = async (fileName, contentType, projectId) => {
  const params = { event_id: fileName, mime_type: contentType };

  const response = await axiosInstance.post(
    '/storage/image',
    null,
    { headers: { 'project-id': projectId }, params },
  );

  return response.data;
};
