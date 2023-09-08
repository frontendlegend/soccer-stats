import { ResponseWrapperT } from "~/types/api"
import { FixturesT } from "~/types/fixtures"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const leagueFixtures = await $fetch<ResponseWrapperT<FixturesT>>(
    'https://v3.football.api-sports.io' + '/fixtures', 
    { 
      params: { league: query.leagueId, season: query.season, round: query.round },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueFixtures
})
