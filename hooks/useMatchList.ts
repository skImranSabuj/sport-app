import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMemo } from "react";
import { fetchMatchList } from "../api/services/matches";
import { mapMatch } from "../mappers/matchMapper";
import { useFilters } from "../store/filters";
import { Match } from "../types/match";

const PAGE_SIZE = 10;
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

type ApiResponse = {
  status: boolean;
  total: number;
  matches: any[];
};

export function useMatchList() {
  const { selectedTournamentIds, selectedDate } = useFilters();
  const tournamentParam =
    selectedTournamentIds.length > 0
      ? selectedTournamentIds.join(",")
      : undefined;

  const todate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined;

  const query = useInfiniteQuery<ApiResponse>({
    queryKey: ["matches", tournamentParam, TIMEZONE, todate],
    queryFn: ({ pageParam = 0 }) =>
      fetchMatchList({
        timezone: TIMEZONE,
        status: "all",
        tournament_ids: tournamentParam,
        limit: PAGE_SIZE,
        offset: pageParam as number,
        ...(todate ? { todate } : {}),
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
