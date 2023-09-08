import { ResponseWrapperT } from "~/types/api"
import { LeagueT } from "~/types/leagues"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const league = await $fetch<ResponseWrapperT<[LeagueT]>>(
    (process.env.API_BASE_URL ?? event.context.env.API_BASE_URL) + '/leagues', 
    { 
      params: { id: query.id },
      headers: { 
        'x-apisports-key': 
          (process.env.X_APISPORTS_KEY ?? event.context.env.X_APISPORTS_KEY) ?? '' 
      }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return league
})
