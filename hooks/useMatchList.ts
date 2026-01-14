// hooks/useMatchList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchMatchList } from "../api/matches";
// import { mapMatch } from "../mappers/matchMapper";
import { mapMatch } from "../mappers/matchMapper";
import { useFilters } from "../store/filters";
import { Match } from "../types/match";

const PAGE_SIZE = 10;
const TIMEZONE = "Australia/Sydney";

type ApiResponse = {
  status: boolean;
  total: number;
  matches: any[];
};

export function useMatchList() {
  const { selectedTournamentIds } = useFilters();
  const tournamentParam =
    selectedTournamentIds.length > 0
      ? selectedTournamentIds.join(",")
      : undefined;

  const query = useInfiniteQuery<ApiResponse>({
    queryKey: ["matches", tournamentParam, TIMEZONE],
    queryFn: ({ pageParam = 0 }) =>
      fetchMatchList({
        timezone: TIMEZONE,
        status: "all",
        tournament_ids: tournamentParam,
        limit: PAGE_SIZE,
        offset: pageParam as number,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (sum, page) => sum + page.matches.length,
        0
      );

      return loaded < lastPage.total ? loaded : undefined;
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    initialPageParam: 0,
  });

  /**
   * ✅ Flatten + map + de-duplicate
   */
  const data: Match[] = useMemo(() => {
    if (!query.data) return [];

    const mapped = query.data.pages
      .flatMap((page) => page.matches)
      .map(mapMatch);

    return Array.from(new Map(mapped.map((m) => [m.id, m])).values());
  }, [query.data]);

  return {
    ...query,
    data,
    pageSize: PAGE_SIZE,
  };
}
