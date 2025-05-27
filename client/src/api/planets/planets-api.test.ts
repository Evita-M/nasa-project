import { describe, expect, it, vi, beforeEach } from 'vitest';
import axiosInstance from '../axios-instance';
import { httpGetPlanets } from './planets-api';
import { testErrorHandling } from '@/lib/test-helpers';
import { Planet } from '@/types/planet';

vi.mock('../axios-instance', () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedAxiosGet = vi.mocked(axiosInstance.get);

describe('GET planets', () => {
  const mockPlanetData: Planet = {
    name: 'Kepler-186 f',
    rotation_period: '1 day',
    orbital_period: '365 days',
    diameter: '100000 km',
    climate: 'temperate',
    gravity: '1 g',
    terrain: 'rocky',
    surface_water: '100%',
    population: '1000000',
    residents: ['1', '2', '3'],
    films: ['1', '2', '3'],
    created: new Date('January 4, 2028'),
    edited: new Date('January 4, 2028'),
    url: 'https://swapi.dev/api/planets/1/',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('httpGetPlanets fetches planets data successfully', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [mockPlanetData] });

    const planets = await httpGetPlanets();
    expect(planets).toEqual([mockPlanetData]);
    expect(axiosInstance.get).toHaveBeenCalledWith('/planets');
  });

  it('httpGetPlanets handles 400 error correctly', async () => {
    await testErrorHandling(
      { status: 400, message: 'Bad Request', data: {} },
      mockedAxiosGet,
      httpGetPlanets
    );
  });

  it('httpGetPlanets handles 404 error correctly', async () => {
    await testErrorHandling(
      { status: 404, message: 'Not Found', data: {} },
      mockedAxiosGet,
      httpGetPlanets
    );
  });

  it('httpGetPlanets handles 500 error correctly', async () => {
    await testErrorHandling(
      {
        status: 500,
        message: 'Internal Server Error',
        data: {},
      },
      mockedAxiosGet,
      httpGetPlanets
    );
  });

  it('httpGetPlanets handles 401 error correctly', async () => {
    await testErrorHandling(
      { status: 401, message: 'Unauthorized', data: {} },
      mockedAxiosGet,
      httpGetPlanets
    );
  });

  it('httpGetPlanets handles 403 error correctly', async () => {
    await testErrorHandling(
      { status: 403, message: 'Forbidden', data: {} },
      mockedAxiosGet,
      httpGetPlanets
    );
  });

  it('httpGetPlanets handles network error (no response) correctly', async () => {
    await testErrorHandling(
      {
        status: 0,
        message: 'No response received from server',
        data: null,
      },
      mockedAxiosGet,
      httpGetPlanets
    );
  });

  it('httpGetPlanets handles unknown error (no response or request) correctly', async () => {
    await testErrorHandling(
      {
        status: 0,
        message: 'Error setting up request',
        data: null,
      },
      mockedAxiosGet,
      httpGetPlanets
    );
  });
});
