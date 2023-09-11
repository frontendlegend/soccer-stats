import { ResponseWrapperT } from "~/types/api"
import { SeasonsT } from "~/types/seasons"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const teamSeasons = await soccerApi<ResponseWrapperT<SeasonsT>>({
    prodEnv: event.context.env, 
    path: '/teams/seasons', 
    params: { team: query.teamId },
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return teamSeasons
})
