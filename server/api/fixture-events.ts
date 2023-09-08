import { ResponseWrapperT } from "~/types/api"
import { FixtureEventsT } from "~/types/fixture-events"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const fixtureEvents = await $fetch<ResponseWrapperT<FixtureEventsT>>(
    'https://v3.football.api-sports.io' + '/fixtures/events',
    {
      params: { fixture: query.fixture },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureEvents
})
