import { ResponseWrapperT } from "~/types/api"
import { FixtureEventsT } from "~/types/fixture-events"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const fixtureEvents = await $fetch<ResponseWrapperT<FixtureEventsT>>(
    process.env.API_BASE_URL + '/fixtures/events',
    {
      params: { fixture: query.fixture },
      headers: { 'x-apisports-key': process.env.X_APISPORTS_KEY ?? '' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureEvents
})
