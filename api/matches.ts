import { Match, SportWithTournaments } from "../types/match";
import { get } from "./http";

// api/matches.ts
type MatchListResponse = Match[]; // adjust if actual shape differs

export async function fetchMatchList({
  timezone,
  status = 'all',
  tournament_ids,
  limit,
  offset,
}: {
  timezone: string;
  status?: string;
  tournament_ids?: string;
  limit?: number;
  offset?: number;
}) {
  return get<MatchListResponse>('sports/matchList', {
    timezone,
    status,
    tournament_ids: tournament_ids ?? '',
    limit: limit ?? 20,
    offset: offset ?? 0,
  });
}

// api/sports.ts
export async function fetchAllSportsAndLeagues({
  search,
  limit = 10,
  offset = 0,
}: {
  search?: string;
  limit?: number;
  offset?: number;
}) {
  return get<SportWithTournaments[]>('sports/AllSportsAndLeagues', {
    search: search ?? '',
    limit,
    offset,
  });
}