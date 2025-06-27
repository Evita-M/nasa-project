import { Launch } from '@/types/launch';
import axiosInstance from '../axios-instance';

async function httpGetLaunches(page = 1, limit = 10, status?: Launch) {
  const response = await axiosInstance.get('/launches', {
    params: { page, limit, status },
  });
  return response.data;
}

async function httpSubmitLaunch(launch: unknown) {
  const response = await axiosInstance.post('/launches', launch);
  return response.data;
}

async function httpAbortLaunch(id: string) {
  const response = await axiosInstance.delete(`/launches/${id}`);
  return response.data;
}

export { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
