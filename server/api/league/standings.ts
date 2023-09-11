import { ResponseWrapperT } from "~/types/api"
import { LeagueStandingsT } from "~/types/league/standings"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const leagueStandings = await soccerApi<ResponseWrapperT<[LeagueStandingsT]>>({
    prodEnv: event.context.env,
    path: '/standings', 
    params: { league: query.leagueId, season: query.season },
  })
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return leagueStandings
})
