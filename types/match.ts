// types/match.ts
export type Match = {
  id: number;
  sportId: number;
  sportName: string;
  tournamentName: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  startTimeISO: string;
  hasTips?: boolean;
};

// types/sport.ts
export type SportWithTournaments = {
  id: number;
  sportName: string;
  tournaments: { id: number; name: string }[];
};