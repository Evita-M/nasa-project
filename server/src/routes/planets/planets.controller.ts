import { getAllPlanets } from '../../models/planets.model';
import { Request, Response } from 'express';

async function httpGetAllPlanets(req: Request, res: Response): Promise<any> {
  try {
    const planets = await getAllPlanets();
    return res.status(200).json(planets);
  } catch (error) {
    console.error('Failed to fetch planets:', error);
    return res.status(500).json({
      error: 'Failed to fetch planets',
    });
  }
}

export { httpGetAllPlanets };
