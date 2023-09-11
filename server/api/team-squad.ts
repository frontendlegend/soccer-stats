import { ResponseWrapperT } from "~/types/api"
import { TeamsSquadT } from "~/types/team-squad"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const teamSquad = await soccerApi<ResponseWrapperT<[TeamsSquadT]>>({
    prodEnv: event.context.env,
    path: '/players/squads',
    params: { team: query.team }
  })
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return teamSquad
})
