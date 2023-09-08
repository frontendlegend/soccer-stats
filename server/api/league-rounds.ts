import { ResponseWrapperT } from "~/types/api"
import { LeagueRoundsT } from "~/types/league-rounds"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const leagueRounds = await $fetch<ResponseWrapperT<LeagueRoundsT>>(
    'https://v3.football.api-sports.io' + '/fixtures/rounds', 
    { 
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' },
      params: { league: query.leagueId, season: query.season, current: query.current }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueRounds
})
