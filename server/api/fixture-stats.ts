import { ResponseWrapperT } from "~/types/api"
import { FixtureStatisticsT } from "~/types/fixture-statistics"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const fixtureStats = await $fetch<ResponseWrapperT<FixtureStatisticsT>>(
    'https://v3.football.api-sports.io' + '/fixtures/statistics',
    {
      params: { fixture: query.fixture },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureStats
})
