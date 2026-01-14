import { Match } from "../types/match";

const BASE_URL = process.env.EXPO_PUBLIC_MEDIA_SERVER + "/";

export function mapMatch(api: any): Match {
  return {
    id: api.id,
    sportId: api.sport_id,
    sportName: api.sport?.sportName,
    tournamentName: api.tournament?.name,

    homeTeam: api.homeTeam.name,
    awayTeam: api.awayTeam.name,

    homeLogo: BASE_URL + api.homeTeam.logo,
    awayLogo: BASE_URL + api.awayTeam.logo,

    startTimeISO: api.start_time,
    status: api.status,
    displayStatus: api.display_status,
    score: api.score,
  };
}
