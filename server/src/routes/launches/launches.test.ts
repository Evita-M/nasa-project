import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server';
import { MESSAGE } from './launches.controller';

describe('Test GET /launches', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST /launches', () => {
  const launchData = {
    missionName: 'USS Enterprise',
    rocketName: 'Explorer 1',
    planetName: 'Kepler-62 f',
    launchDate: 'January 24, 2026',
  };

  const launchDataWithoutDate = {
    missionName: 'USS Enterprise',
    rocketName: 'Explorer 1',
    planetName: 'Kepler-62 f',
  };

  it('should return a 201 status code', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(launchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  it('should return a 400 status code', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      message: MESSAGE.MISSING_REQUIRED_PROPERTY,
    });
  });

  it('should return a 400 status code with invalid date', async () => {
    const response = await request(app)
      .post('/launches')
      .send({
        ...launchData,
        launchDate: 'test',
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      message: MESSAGE.INVALID_LAUNCH_DATE,
    });
  });
});
