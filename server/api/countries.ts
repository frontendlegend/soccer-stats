import { ResponseWrapperT } from "~/types/api"
import { CountriesT } from "~/types/countries"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const countries = await $fetch<ResponseWrapperT<CountriesT>>(
    'https://v3.football.api-sports.io' + '/countries', 
    { 
      params: { search: query.search },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return countries
})
