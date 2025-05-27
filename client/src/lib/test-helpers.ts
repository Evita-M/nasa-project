import { ApiError } from '@/api/axios-instance';
import { expect } from 'vitest';

async function testErrorHandling(
  { status, message, data = {} }: ApiError,
  mockFn: { mockRejectedValueOnce: (value: any) => void },
  apiCall: () => Promise<any>
) {
  mockFn.mockRejectedValueOnce({ message, status, data });
  expect.assertions(2);
  try {
    await apiCall();
  } catch (error) {
    expect(error && typeof error === 'object').toBe(true);
    if (error && typeof error === 'object') {
      expect(error).toMatchObject({ message, status });
    }
  }
}

export { testErrorHandling };
