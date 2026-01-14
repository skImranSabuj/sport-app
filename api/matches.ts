import { ApiResponse, Match } from "../types/match";

// api/matches.ts
type MatchListResponse = Match[]; // adjust if actual shape differs

export async function fetchMatchList(params: {
  timezone: string;
  status?: string;
  tournament_ids?: string;
  limit?: number;
  offset?: number;
}): Promise<ApiResponse> {
  const url = new URL(
    process.env.EXPO_PUBLIC_API_BASE_URL + "/sports/matchList"
  );
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.append(k, String(v));
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Network error");
  return res.json() as Promise<ApiResponse>; // ✅ returns full object
}
