import { ResponseWrapperT } from "~/types/api"
import { FixturesT } from "~/types/fixtures"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const leagueFixtures = await soccerApi<ResponseWrapperT<FixturesT>>({
    prodEnv: event.context.env,
    path: '/fixtures', 
    params: { league: query.leagueId, season: query.season, round: query.round },
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueFixtures
})
