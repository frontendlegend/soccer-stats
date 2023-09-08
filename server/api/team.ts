import { ResponseWrapperT } from "~/types/api"
import { TeamT } from "~/types/team"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const team = await $fetch<ResponseWrapperT<[TeamT]>>(
    'https://v3.football.api-sports.io' + '/teams', 
    { 
      params: { id: query.id },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return team
})
