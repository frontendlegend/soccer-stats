import { ResponseWrapperT } from "~/types/api"
import { LeagueT } from "~/types/leagues"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const league = await $fetch<ResponseWrapperT<[LeagueT]>>(
    'https://v3.football.api-sports.io' + '/leagues', 
    { 
      params: { id: query.id },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return league
})
