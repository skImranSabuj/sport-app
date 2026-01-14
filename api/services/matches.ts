import { ApiResponse } from "../../types/match";
import { get } from "../apiClient";

export async function fetchMatchList(params: {
  timezone: string;
  status?: string;
  todate?: string;
  tournament_ids?: string;
  limit?: number;
  offset?: number;
}): Promise<ApiResponse> {
  return get<ApiResponse>("sports/matchList", params);
}
