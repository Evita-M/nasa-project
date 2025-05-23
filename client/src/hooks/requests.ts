import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

async function httpGetPlanets() {
  const response = await instance.get('/planets');
  return response.data;
}

async function httpGetLaunches() {
  const response = await instance.get('/launches');
  const sortedLaunches = response.data.sort((a: any, b: any) => {
    return a.flightNumber - b.flightNumber;
  });
  return sortedLaunches;
}

async function httpSubmitLaunch(launch: unknown) {
  const response = await instance.post('/launches', launch);
  return response.data;
}

async function httpAbortLaunch(id: string) {
  const response = await instance.delete(`/launches/${id}`);
  return response.data;
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
