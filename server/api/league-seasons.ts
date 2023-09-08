import { ResponseWrapperT } from "~/types/api"
import { SeasonsT } from "~/types/seasons"

export default defineEventHandler(async () => {
  // TODO: api base url and api secret env
  const leagueSeasons = await $fetch<ResponseWrapperT<SeasonsT>>(
    'https://v3.football.api-sports.io' + '/leagues/seasons', 
    { headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }}
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueSeasons
})
