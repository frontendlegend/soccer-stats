import { ResponseWrapperT } from "~/types/api"
import { FixtureT } from "~/types/fixtures"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const fixture = await $fetch<ResponseWrapperT<[FixtureT]>>(
    process.env.API_BASE_URL + '/fixtures', 
    { 
      params: { id: query.fixture },
      headers: { 'x-apisports-key': process.env.X_APISPORTS_KEY ?? '' }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return fixture
})
