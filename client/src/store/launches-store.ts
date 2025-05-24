import {
  httpAbortLaunch,
  httpGetLaunches,
  httpSubmitLaunch,
} from '@/api/launches';
import { Launch, LaunchPayload } from '@/types/launch';
import { create } from 'zustand';

type LaunchesStore = {
  launches: Launch[];
  isLoading: boolean;
  error: string | null;
  fetchLaunches: () => Promise<void>;
  addLaunch: (launch: LaunchPayload) => Promise<void>;
  abortLaunch: (id: string) => Promise<void>;
};

const launchesStore = create<LaunchesStore>((set) => ({
  launches: [],
  isLoading: false,
  error: null,

  fetchLaunches: async () => {
    set({ isLoading: true, error: null });
    try {
      const launches = await httpGetLaunches();
      set({ launches, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch launches', isLoading: false });
    }
  },

  addLaunch: async (launch: LaunchPayload) => {
    set({ isLoading: true, error: null });
    try {
      const newLaunch = await httpSubmitLaunch(launch);
      set((state) => ({
        launches: [...state.launches, newLaunch],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to submit launch', isLoading: false });
    }
  },

  abortLaunch: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await httpAbortLaunch(id);
      set((state) => ({
        launches: state.launches.map((launch) =>
          launch.id === id
            ? { ...launch, upcoming: false, success: false }
            : launch
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to abort launch', isLoading: false });
    }
  },
}));

export default launchesStore;
