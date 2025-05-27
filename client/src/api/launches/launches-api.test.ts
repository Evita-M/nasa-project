import { describe, expect, it, vi, beforeEach } from 'vitest';
import axiosInstance from '../axios-instance';
import {
  httpAbortLaunch,
  httpGetLaunches,
  httpSubmitLaunch,
} from './launches-api';
import { Launch, LaunchPayload } from '@/types/launch';
import { testErrorHandling } from '@/lib/test-helpers';

vi.mock('../axios-instance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedAxiosGet = vi.mocked(axiosInstance.get);
const mockedAxiosPost = vi.mocked(axiosInstance.post);
const mockedAxiosDelete = vi.mocked(axiosInstance.delete);

describe('GET launches', () => {
  const mockLaunchData: Launch = {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('httpGetLaunches fetches launches data successfully', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [mockLaunchData] });

    const launches = await httpGetLaunches();
    expect(launches).toEqual([mockLaunchData]);
    expect(axiosInstance.get).toHaveBeenCalledWith('/launches');
  });

  it('httpGetLaunches handles 400 error correctly', async () => {
    await testErrorHandling(
      { status: 400, message: 'Bad Request', data: {} },
      mockedAxiosGet,
      httpGetLaunches
    );
  });

  it('httpGetLaunches handles 404 error correctly', async () => {
    await testErrorHandling(
      { status: 404, message: 'Not Found', data: {} },
      mockedAxiosGet,
      httpGetLaunches
    );
  });

  it('httpGetLaunches handles 500 error correctly', async () => {
    await testErrorHandling(
      {
        status: 500,
        message: 'Internal Server Error',
        data: {},
      },
      mockedAxiosGet,
      httpGetLaunches
    );
  });

  it('httpGetLaunches handles 401 error correctly', async () => {
    await testErrorHandling(
      { status: 401, message: 'Unauthorized', data: {} },
      mockedAxiosGet,
      httpGetLaunches
    );
  });

  it('httpGetLaunches handles 403 error correctly', async () => {
    await testErrorHandling(
      { status: 403, message: 'Forbidden', data: {} },
      mockedAxiosGet,
      httpGetLaunches
    );
  });

  it('httpGetLaunches handles network error (no response) correctly', async () => {
    await testErrorHandling(
      {
        status: 0,
        message: 'No response received from server',
        data: null,
      },
      mockedAxiosGet,
      httpGetLaunches
    );
  });

  it('httpGetLaunches handles unknown error (no response or request) correctly', async () => {
    await testErrorHandling(
      {
        status: 0,
        message: 'Error setting up request',
        data: null,
      },
      mockedAxiosGet,
      httpGetLaunches
    );
  });

  it('httpSubmitLaunch sends POST request with launch data', async () => {
    const mockLaunch: LaunchPayload = {
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
    mockedAxiosPost.mockResolvedValueOnce({ data: mockResponse });

    const createdLaunch = await httpSubmitLaunch(mockLaunch);

    expect(createdLaunch).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith('/launches', mockLaunch);
  });
});

describe('DELETE launch', () => {
  it('httpAbortLaunch sends DELETE request to abort a launch', async () => {
    const mockLaunchId = '1';
    const mockResponse = { message: 'Launch aborted' };
    mockedAxiosDelete.mockResolvedValueOnce({ data: mockResponse });

    const abortedLaunch = await httpAbortLaunch(mockLaunchId);
    expect(abortedLaunch).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/launches/${mockLaunchId}`
    );
  });

  it('httpAbortLaunch handles 400 error correctly', async () => {
    await testErrorHandling(
      { status: 400, message: 'Bad Request', data: {} },
      mockedAxiosDelete,
      () => httpAbortLaunch('1')
    );
  });
});

describe('POST launch', () => {
  it('httpSubmitLaunch handles 400 error correctly', async () => {
    await testErrorHandling(
      { status: 400, message: 'Bad Request', data: {} },
      mockedAxiosPost,
      () =>
        httpSubmitLaunch({
          missionName: 'Mission One',
          rocketName: 'Rocket One',
          launchDate: new Date('January 4, 2028'),
          planetName: 'Kepler-186 f',
        })
    );
  });
});
