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

async function httpSubmitLaunch(_launch: unknown) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(_id: unknown) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
