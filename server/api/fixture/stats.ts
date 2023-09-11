import { ResponseWrapperT } from "~/types/api"
import { FixtureStatisticsT } from "~/types/fixture/statistics"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const fixtureStats = await soccerApi<ResponseWrapperT<FixtureStatisticsT>>({
    prodEnv: event.context.env,
    path: '/fixtures/statistics',
    params: { fixture: query.fixture },
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureStats
})
