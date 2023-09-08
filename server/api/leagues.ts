import { ResponseWrapperT } from "~/types/api"
import { LeaguesT } from "~/types/leagues"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const leagues = await $fetch<ResponseWrapperT<LeaguesT>>(
    (process.env.API_BASE_URL ?? event.context.env.API_BASE_URL) + '/leagues', 
    { 
      params: { 
        country: query.country, 
        search: query.search, 
        type: query.search ? undefined : 'league'
      },
      headers: { 
        'x-apisports-key': 
          (process.env.X_APISPORTS_KEY ?? event.context.env.X_APISPORTS_KEY) ?? '' 
      }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagues
})
