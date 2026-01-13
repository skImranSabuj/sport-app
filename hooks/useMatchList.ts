// hooks/useMatchList.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useFilters } from '../store/filters';
import { fetchMockMatchList } from '../api/matches.mock';

const PAGE_SIZE = 20;
const TIMEZONE = 'Australia/Sydney';

export function useMatchList() {
  const { selectedTournamentIds } = useFilters();
  const tournamentParam = selectedTournamentIds.join(',') || undefined;

  const query = useInfiniteQuery({
    queryKey: ['matches', tournamentParam, TIMEZONE],
    queryFn: ({ pageParam = 0 }) =>
    //   fetchMatchList({
    //     timezone: TIMEZONE,
    //     status: 'all',
    //     tournament_ids: tournamentParam,
    //     limit: PAGE_SIZE,
    //     offset: pageParam,
    //   }),
    fetchMockMatchList({ limit: 20, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length * PAGE_SIZE,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    initialPageParam: 0,
  });

  const data = useMemo(
    () => Array.from(new Map(query.data?.pages.flat().map((m) => [m.id, m])).values()),
    [query.data],
  );

  return { ...query, data, pageSize: PAGE_SIZE };
}