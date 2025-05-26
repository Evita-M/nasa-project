import { expect, test, vi } from 'vitest';
import axiosInstance from '../axios-instance';
import { httpGetPlanets } from './planets-api';

vi.mock('../axios-instance', () => ({
  default: {
    get: vi.fn(),
  },
}));

// GET planets
test('httpGetPlanets fetches planets data successfully', async () => {
  const mockPlanet = {
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

  axiosInstance.get.mockResolvedValueOnce({ data: [mockPlanet] });

  const planets = await httpGetPlanets();
  expect(planets).toEqual([mockPlanet]);
  expect(axiosInstance.get).toHaveBeenCalledWith('/planets');
});
