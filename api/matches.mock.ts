import mockData from '../assets/mockMatches.json';

export async function fetchMockMatchList({
  limit = 20,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}) {
  // Simulate pagination
  const slice = mockData.slice(offset, offset + limit);
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  return slice;
}