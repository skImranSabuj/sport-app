const BASE = 'https://au.testing.smartb.com.au/api';

export async function get<T>(path: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE}/${path}`);
  Object.entries(params ?? {}).forEach(([k, v]) => url.searchParams.append(k, String(v)));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}