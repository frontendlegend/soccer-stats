import { ResponseWrapperT } from "~/types/api"
import { TeamT } from "~/types/team"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const team = await soccerApi<ResponseWrapperT<[TeamT]>>({
    prodEnv: event.context.env, 
    path: '/teams', 
    params: { id: query.id },
  })
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return team
})
