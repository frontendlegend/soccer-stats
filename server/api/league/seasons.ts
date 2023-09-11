import { ResponseWrapperT } from "~/types/api"
import { SeasonsT } from "~/types/seasons"

export default defineEventHandler(async (event) => {
  const leagueSeasons = await soccerApi<ResponseWrapperT<SeasonsT>>({
    prodEnv: event.context.env, 
    path: '/leagues/seasons', 
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueSeasons
})
