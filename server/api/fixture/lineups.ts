import { ResponseWrapperT } from "~/types/api"
import { FixtureLineupsT } from "~/types/fixture/lineups"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const fixtureLineups = await soccerApi<ResponseWrapperT<FixtureLineupsT>>({
    prodEnv: event.context.env,
    path: '/fixtures/lineups',
    params: { fixture: query.fixture },
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureLineups
})
