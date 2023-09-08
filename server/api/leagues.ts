import { ResponseWrapperT } from "~/types/api"
import { LeaguesT } from "~/types/leagues"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const leagues = await $fetch<ResponseWrapperT<LeaguesT>>(
    'https://v3.football.api-sports.io' + '/leagues', 
    { 
      params: { 
        country: query.country, 
        search: query.search, 
        type: query.search ? undefined : 'league'
      },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagues
})
