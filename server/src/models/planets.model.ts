import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import PlanetsDatabase from './planets.mongo';

interface Planet {
  keplerName: string;
}

// https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
// https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

async function loadPlanetsData(): Promise<void> {
  return new Promise((resolve, reject) =>
    fs
      .createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          await PlanetsDatabase.updateOne(
            { keplerName: data.kepler_name },
            { keplerName: data.kepler_name },
            { upsert: true }
          );
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const habitablePlanetsCount = (await getAllPlanets()).length;
        console.log(`${habitablePlanetsCount} habitable planets found!`);
        resolve();
      })
  );
}

async function getAllPlanets(): Promise<Planet[]> {
  const habitablePlanets = await PlanetsDatabase.find(
    {},
    { _id: 0, __v: 0, films: 0, residents: 0 }
  );
  return habitablePlanets;
}

export { getAllPlanets, loadPlanetsData };
