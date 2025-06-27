import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../server';
import { MESSAGE } from './launches.controller';
import { mongoConnect, mongoDisconnect } from '../../services/mongo';
import { loadPlanetsData } from '../../models/planets.model';

beforeAll(async () => {
  await mongoConnect();
  await loadPlanetsData();
});

afterAll(async () => {
  await mongoDisconnect();
});

describe('Test GET /launches', () => {
  it('should return a 200 status code', async () => {
    await request(app).get('/api/v1/launches').expect(200);
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
      .post('/api/v1/launches')
      .send(launchData)
      .expect(201);

    const requestDate = new Date(launchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  it('should return a 400 status code', async () => {
    const response = await request(app)
      .post('/api/v1/launches')
      .send(launchDataWithoutDate)
      .expect(400);

    expect(response.body).toStrictEqual({
      message: MESSAGE.MISSING_REQUIRED_PROPERTY,
    });
  });

  it('should return a 400 status code with invalid date', async () => {
    const response = await request(app)
      .post('/api/v1/launches')
      .send({
        ...launchData,
        launchDate: 'test',
      })
      .expect(400);

    expect(response.body).toStrictEqual({
      message: MESSAGE.INVALID_LAUNCH_DATE,
    });
  });
});
