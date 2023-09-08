import { ResponseWrapperT } from "~/types/api"
import { TeamsSquadT } from "~/types/team-squad"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const teamSquad = await $fetch<ResponseWrapperT<[TeamsSquadT]>>(
    'https://v3.football.api-sports.io' + '/players/squads',
    {
      params: { team: query.team },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return teamSquad
})
