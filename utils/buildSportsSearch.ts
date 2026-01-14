type SportSearchMap = Record<number, string>;

export function buildSportsSearchParam(searchMap: SportSearchMap) {
  const entries = Object.entries(searchMap)
    .filter(([, text]) => text.trim().length > 0)
    .map(([sportId, text]) => `${sportId}[${text}]`);

  return entries.length > 0 ? entries.join(",") : undefined;
}
