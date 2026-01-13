import { create } from 'zustand';

type FiltersState = {
  selectedTournamentIds: number[];
  searchText: string;
  setSelected: (ids: number[]) => void;
  reset: () => void;
  setSearch: (s: string) => void;
};

export const useFilters = create<FiltersState>((set) => ({
  selectedTournamentIds: [],
  searchText: '',
  setSelected: (ids) => set({ selectedTournamentIds: ids }),
  reset: () => set({ selectedTournamentIds: [], searchText: '' }),
  setSearch: (s) => set({ searchText: s }),
}));