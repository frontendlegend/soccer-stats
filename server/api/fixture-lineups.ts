import { ResponseWrapperT } from "~/types/api"
import { FixtureLineupsT } from "~/types/fixture-lineups"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const fixtureLineups = await $fetch<ResponseWrapperT<FixtureLineupsT>>(
    'https://v3.football.api-sports.io' + '/fixtures/lineups',
    {
      params: { fixture: query.fixture },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureLineups
})
