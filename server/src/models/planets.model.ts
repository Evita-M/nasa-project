import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';

interface Planet {
  kepler_name: string;
}

const habitablePlanets: Planet[] = [];

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

function loadPlanetsData(): Promise<void> {
  return new Promise((resolve, reject) =>
    fs
      .createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      })
  );
}

async function getAllPlanets(): Promise<Planet[]> {
  if (habitablePlanets.length === 0) {
    await loadPlanetsData();
  }
  return habitablePlanets;
}

export { getAllPlanets, loadPlanetsData };
