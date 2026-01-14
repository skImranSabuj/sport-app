import { ApiResponse, Match, SportWithTournaments } from "../types/match";
import { get } from "./http";

// api/matches.ts
type MatchListResponse = Match[]; // adjust if actual shape differs

export async function fetchMatchList(params: {
  timezone: string;
  status?: string;
  tournament_ids?: string;
  limit?: number;
  offset?: number;
}): Promise<ApiResponse> {
  const url = new URL("https://smartb.com.au/soc-api/sports/matchList");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.append(k, String(v));
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Network error");
  return res.json() as Promise<ApiResponse>; // ✅ returns full object
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
  return get<SportWithTournaments[]>("sports/AllSportsAndLeagues", {
    search: search ?? "",
    limit,
    offset,
  });
}
