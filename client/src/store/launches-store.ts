import {
  httpAbortLaunch,
  httpGetLaunches,
  httpSubmitLaunch,
} from '@/api/launches/launches-api';
import { Launch, LaunchPayload, LaunchStatus } from '@/types/launch';
import { create } from 'zustand';

// Pagination and filtering types
interface LaunchesStore {
  launches: Launch[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalCount: number;
  upcomingCount: number;
  historyCount: number;
  currentStatus: LaunchStatus | undefined;

  fetchLaunches: (
    page?: number,
    limit?: number,
    status?: LaunchStatus,
    append?: boolean
  ) => Promise<void>;
  addLaunch: (launch: LaunchPayload) => Promise<void>;
  abortLaunch: (id: string) => Promise<void>;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const launchesStore = create<LaunchesStore>((set, get) => ({
  launches: [],
  isLoading: false,
  error: null,
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  totalCount: 0,
  upcomingCount: 0,
  historyCount: 0,
  currentStatus: undefined,

  fetchLaunches: async (
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    status,
    append = false
  ) => {
    set({ isLoading: true, error: null });
    try {
      const data = await httpGetLaunches(page, limit, status);
      set((state) => ({
        launches: append
          ? [...state.launches, ...data.launches]
          : data.launches,
        totalCount: data.totalCount,
        upcomingCount: data.upcomingCount,
        historyCount: data.historyCount,
        page,
        limit,
        isLoading: false,
        currentStatus: status,
      }));
    } catch (error) {
      set({ error: 'Failed to fetch launches', isLoading: false });
    }
  },

  addLaunch: async (launch: LaunchPayload) => {
    set({ isLoading: true, error: null });
    try {
      await httpSubmitLaunch(launch);
      // Refetch data to get updated counts and ensure data consistency
      const state = get();
      await state.fetchLaunches(state.page, state.limit, state.currentStatus, false);
    } catch (error) {
      set({ error: 'Failed to submit launch', isLoading: false });
    }
  },

  abortLaunch: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await httpAbortLaunch(id);
      // Refetch data to get updated counts and ensure data consistency
      const state = get();
      await state.fetchLaunches(state.page, state.limit, state.currentStatus, false);
    } catch (error) {
      set({ error: 'Failed to abort launch', isLoading: false });
    }
  },
}));

export default launchesStore;
