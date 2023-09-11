import { ResponseWrapperT } from "~/types/api"
import { CountriesT } from "~/types/countries"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const countries = await soccerApi<ResponseWrapperT<CountriesT>>({
    prodEnv: event.context.env,
    path: '/countries',
    params: { search: query.search }
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return countries
})
