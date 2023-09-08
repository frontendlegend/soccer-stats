import { ResponseWrapperT } from "~/types/api"
import { SeasonsT } from "~/types/seasons"

export default defineEventHandler(async () => {
  // TODO: api base url and api secret env
  const leagueSeasons = await $fetch<ResponseWrapperT<SeasonsT>>(
    process.env.API_BASE_URL + '/leagues/seasons', 
    { headers: { 'x-apisports-key': process.env.X_APISPORTS_KEY ?? '' }}
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueSeasons
})
