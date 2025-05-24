import axiosInstance from './axios-instance';

async function httpGetPlanets() {
  const response = await axiosInstance.get('/planets');
  return response.data;
}

export { httpGetPlanets };
