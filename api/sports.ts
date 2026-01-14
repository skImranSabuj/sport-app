type SportsQueryParams = {
  search?: string;
  limit?: number;
  offset?: number;
};

export async function fetchSportsAndLeagues(params: SportsQueryParams) {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.limit != null) query.append("limit", String(params.limit));
  if (params.offset != null) query.append("offset", String(params.offset));

  const res = await fetch(
    `${
      process.env.EXPO_PUBLIC_API_BASE_URL
    }/sports/AllSportsAndLeagues?${query.toString()}`
  );

  if (!res.ok) throw new Error("Failed to fetch sports");

  return res.json();
}
