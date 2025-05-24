import { create } from 'zustand';
import { Planet } from '@/types/planet';
import { httpGetPlanets } from '@/api/planets';

type PlanetsStore = {
  planets: Planet[];
  isLoading: boolean;
  error: string | null;
  fetchPlanets: () => Promise<void>;
};

const planetsStore = create<PlanetsStore>((set) => ({
  planets: [],
  isLoading: false,
  error: null,

  fetchPlanets: async () => {
    set({ isLoading: true, error: null });
    try {
      const planets = await httpGetPlanets();
      set({ planets, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch launches', isLoading: false });
    }
  },
}));

export default planetsStore;
