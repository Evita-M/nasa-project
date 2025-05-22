import { useCallback, useEffect, useState } from 'react';
import { httpGetLaunches } from './requests';

function useLaunches() {
  const [launches, saveLaunches] = useState([]);

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  return launches;
}

export default useLaunches;
