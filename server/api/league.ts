import { ResponseWrapperT } from "~/types/api"
import { LeagueT } from "~/types/leagues"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const league = await soccerApi<ResponseWrapperT<[LeagueT]>>({
    prodEnv: event.context.env, 
    path: '/leagues', 
    params: { id: query.id },
  })
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return league
})
