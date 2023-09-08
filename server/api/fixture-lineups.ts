import { ResponseWrapperT } from "~/types/api"
import { FixtureLineupsT } from "~/types/fixture-lineups"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const fixtureLineups = await $fetch<ResponseWrapperT<FixtureLineupsT>>(
    (process.env.API_BASE_URL ?? event.context.env.API_BASE_URL) + '/fixtures/lineups',
    {
      params: { fixture: query.fixture },
      headers: { 
        'x-apisports-key': 
          (process.env.X_APISPORTS_KEY ?? event.context.env.X_APISPORTS_KEY) ?? '' 
      }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureLineups
})
