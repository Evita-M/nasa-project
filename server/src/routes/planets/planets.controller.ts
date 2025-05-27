import { getAllPlanets } from '../../models/planets.model';
import { Request, Response } from 'express';

async function httpGetAllPlanets(req: Request, res: Response): Promise<any> {
  try {
    const planets = (await getAllPlanets()) || [];
    return res
      .status(200)
      .json(
        Array.isArray(planets)
          ? planets.map((planet) => ({ name: planet.kepler_name }))
          : []
      );
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch planets',
    });
  }
}

export { httpGetAllPlanets };
