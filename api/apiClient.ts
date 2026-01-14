const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export type RequestParams = Record<
  string,
  string | number | boolean | undefined
>;

export async function get<T>(path: string, params?: RequestParams): Promise<T> {
  const url = new URL(`${BASE_URL}/${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<T>;
}

export async function post<T>(
  path: string,
  body?: Record<string, any>
): Promise<T> {
  const res = await fetch(`${BASE_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<T>;
}
