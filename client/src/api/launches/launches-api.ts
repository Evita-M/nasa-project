import axiosInstance from '../axios-instance';

async function httpGetLaunches() {
  const response = await axiosInstance.get('/launches');
  const sortedLaunches = response.data.sort((a: any, b: any) => {
    return a.flightNumber - b.flightNumber;
  });
  return sortedLaunches;
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
