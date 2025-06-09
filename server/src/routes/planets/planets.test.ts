import { describe, it, vi, afterAll, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../server';
import { mongoConnect, mongoDisconnect } from '../../services/mongo';

vi.mock('fs', () => {
  const { Readable } = require('stream');
  const mockFs = {
    createReadStream: vi.fn(() => {
      const data = 'kepler_name,disposition\nKepler-62 f,CONFIRMED\n';
      const stream = new Readable();
      stream.push(data);
      stream.push(null);
      return stream;
    }),
  };
  return {
    ...mockFs,
    default: mockFs,
  };
});

beforeAll(async () => {
  await mongoConnect();
});

afterAll(async () => {
  await mongoDisconnect();
});

describe('Test GET /planets', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/api/v1/planets').expect(200);
  });
});
