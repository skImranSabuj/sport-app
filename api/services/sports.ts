import { get } from "../apiClient";

type SportsQueryParams = {
  search?: string;
  limit?: number;
  offset?: number;
};

export async function fetchSportsAndLeagues(params: SportsQueryParams) {
  return get("sports/AllSportsAndLeagues", params);
}
