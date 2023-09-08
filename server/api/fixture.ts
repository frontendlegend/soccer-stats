import { ResponseWrapperT } from "~/types/api"
import { FixtureT } from "~/types/fixtures"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const fixture = await $fetch<ResponseWrapperT<[FixtureT]>>(
    'https://v3.football.api-sports.io' + '/fixtures', 
    { 
      params: { id: query.fixture },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return fixture
})
