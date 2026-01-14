import { useQuery } from "@tanstack/react-query";
import { fetchSportsAndLeagues } from "../api/sports";
import { useFilters } from "../store/filters";
import { buildSportsSearchParam } from "../utils/buildSportsSearch";

const PAGE_SIZE = 10;

export function useSportsAndLeagues() {
  const { appliedSportSearch } = useFilters();
  const searchParam = buildSportsSearchParam(appliedSportSearch);

  return useQuery({
    queryKey: ["sports-leagues", searchParam, PAGE_SIZE],
    queryFn: () =>
      fetchSportsAndLeagues({
        search: searchParam,
        limit: PAGE_SIZE,
        offset: 0,
      }),
    staleTime: 60 * 60 * 1000,
  });
}
