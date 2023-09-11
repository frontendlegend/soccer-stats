import { ResponseWrapperT } from "~/types/api"
import { LeaguesT } from "~/types/league"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const leagues = await soccerApi<ResponseWrapperT<LeaguesT>>({
    prodEnv: event.context.env,
    path: '/leagues', 
    params: { 
      country: query.country, 
      search: query.search, 
      type: query.search ? undefined : 'league'
    }
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagues
})
