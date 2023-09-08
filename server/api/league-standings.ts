import { ResponseWrapperT } from "~/types/api"
import { LeagueStandingsT } from "~/types/league-standings"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const leagueStandings = await $fetch<ResponseWrapperT<[LeagueStandingsT]>>(
    'https://v3.football.api-sports.io' + '/standings', 
    { 
      params: { league: query.leagueId, season: query.season },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return leagueStandings
})
