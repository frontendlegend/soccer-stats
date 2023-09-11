import { ResponseWrapperT } from "~/types/api"
import { FixtureEventsT } from "~/types/fixture/events"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const fixtureEvents = await soccerApi<ResponseWrapperT<FixtureEventsT>>({
    prodEnv: event.context.env,
    path: '/fixtures/events',
    params: { fixture: query.fixture }
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return fixtureEvents
})
