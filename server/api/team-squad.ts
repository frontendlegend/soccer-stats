import { ResponseWrapperT } from "~/types/api"
import { TeamsSquadT } from "~/types/team-squad"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const teamSquad = await $fetch<ResponseWrapperT<[TeamsSquadT]>>(
    process.env.API_BASE_URL + '/players/squads',
    {
      params: { team: query.team },
      headers: { 'x-apisports-key': process.env.X_APISPORTS_KEY ?? '' }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return teamSquad
})
