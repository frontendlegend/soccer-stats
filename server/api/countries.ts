import { ResponseWrapperT } from "~/types/api"
import { CountriesT } from "~/types/countries"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const countries = await $fetch<ResponseWrapperT<CountriesT>>(
    (process.env.API_BASE_URL ?? event.context.env.API_BASE_URL) + '/countries', 
    { 
      params: { search: query.search },
      headers: { 
        'x-apisports-key': 
          (process.env.X_APISPORTS_KEY ?? event.context.env.X_APISPORTS_KEY) ?? '' 
      }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return countries
})
