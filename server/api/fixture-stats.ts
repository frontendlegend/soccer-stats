import { ResponseWrapperT } from "~/types/api"
import { FixtureStatisticsT } from "~/types/fixture-statistics"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const fixtureStats = await $fetch<ResponseWrapperT<FixtureStatisticsT>>(
    process.env.API_BASE_URL + '/fixtures/statistics',
    {
      params: { fixture: query.fixture },
      headers: { 'x-apisports-key': process.env.X_APISPORTS_KEY ?? '' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureStats
})
