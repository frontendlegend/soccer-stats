import { ResponseWrapperT } from "~/types/api"
import { FixtureT } from "~/types/fixtures"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const fixture = await soccerApi<ResponseWrapperT<[FixtureT]>>({
    prodEnv: event.context.env, 
    path: '/fixtures', 
    params: { id: query.fixture },
  })
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return fixture
})
