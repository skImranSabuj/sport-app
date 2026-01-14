import { create } from "zustand";

type FiltersState = {
  // Applied (used by APIs)
  selectedTournamentIds: number[];
  appliedSportSearch: Record<number, string>;

  // Draft (used by UI)
  draftSelectedTournamentIds: number[];
  draftSportSearch: Record<number, string>;

  // Actions
  toggleDraftTournament: (id: number) => void;
  removeTournament: (id: number) => void;

  setDraftSportSearch: (sportId: number, text: string) => void;

  apply: () => void;
  reset: () => void;
};

export const useFilters = create<FiltersState>((set) => ({
  selectedTournamentIds: [],
  appliedSportSearch: {},

  draftSelectedTournamentIds: [],
  draftSportSearch: {},

  toggleDraftTournament: (id) =>
    set((state) => ({
      draftSelectedTournamentIds: state.draftSelectedTournamentIds.includes(id)
        ? state.draftSelectedTournamentIds.filter((x) => x !== id)
        : [...state.draftSelectedTournamentIds, id],
    })),

  removeTournament: (id) =>
    set((state) => ({
      selectedTournamentIds: state.selectedTournamentIds.filter(
        (t) => t !== id
      ),
      draftSelectedTournamentIds: state.draftSelectedTournamentIds.filter(
        (t) => t !== id
      ),
    })),

  setDraftSportSearch: (sportId, text) =>
    set((state) => ({
      draftSportSearch: {
        ...state.draftSportSearch,
        [sportId]: text,
      },
    })),

  apply: () =>
    set((state) => ({
      selectedTournamentIds: state.draftSelectedTournamentIds,
      appliedSportSearch: state.draftSportSearch,
    })),

  reset: () =>
    set({
      selectedTournamentIds: [],
      appliedSportSearch: {},
      draftSelectedTournamentIds: [],
      draftSportSearch: {},
    }),
}));
