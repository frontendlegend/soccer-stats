import { ResponseWrapperT } from "~/types/api"
import { LeagueRoundsT } from "~/types/league-rounds"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const leagueRounds = await soccerApi<ResponseWrapperT<LeagueRoundsT>>({
    prodEnv: event.context.env, 
    path: '/fixtures/rounds',
    params: { league: query.leagueId, season: query.season, current: query.current },
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueRounds
})
