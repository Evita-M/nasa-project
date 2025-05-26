import { expect, test, vi } from 'vitest';
import axiosInstance from '../axios-instance';
import {
  httpAbortLaunch,
  httpGetLaunches,
  httpSubmitLaunch,
} from './launches-api';

vi.mock('../axios-instance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

// GET launches
test('httpGetLaunches fetches launches data successfully', async () => {
  const mockLaunch = {
    id: '1',
    flightNumber: 1,
    missionName: 'Mission One',
    rocketName: 'Rocket One',
    launchDate: new Date('January 4, 2028'),
    planetName: 'Kepler-186 f',
    customers: ['NASA', 'SpaceX'],
    upcoming: true,
    success: true,
  };

  axiosInstance.get.mockResolvedValueOnce({ data: [mockLaunch] });

  const launches = await httpGetLaunches();
  expect(launches).toEqual([mockLaunch]);
  expect(axiosInstance.get).toHaveBeenCalledWith('/launches');
});

// POST launch
test('httpSubmitLaunch sends POST request with launch data', async () => {
  const mockLaunch = {
    missionName: 'Mission One',
    rocketName: 'Rocket One',
    launchDate: new Date('January 4, 2028'),
    planetName: 'Kepler-186 f',
  };
  const mockResponse = {
    ...mockLaunch,
    id: 2,
    flightNumber: 2,
    customers: ['NASA', 'SpaceX'],
    upcoming: true,
    success: true,
  };
  axiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

  const createdLaunch = await httpSubmitLaunch(mockLaunch);

  expect(createdLaunch).toEqual(mockResponse);
  expect(axiosInstance.post).toHaveBeenCalledWith('/launches', mockLaunch);
});

// DELETE launch
test('httpAbortLaunch sends DELETE request to abort a launch', async () => {
  const mockLaunchId = '1';
  const mockResponse = { message: 'Launch aborted' };
  axiosInstance.delete.mockResolvedValueOnce({ data: mockResponse });

  const abortedLaunch = await httpAbortLaunch(mockLaunchId);
  expect(abortedLaunch).toEqual(mockResponse);
  expect(axiosInstance.delete).toHaveBeenCalledWith(
    `/launches/${mockLaunchId}`
  );
});
