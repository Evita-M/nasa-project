import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server';

describe('Test GET /planets', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app)
      .get('/planets')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
