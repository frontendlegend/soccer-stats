import { ResponseWrapperT } from "~/types/api"
import { SeasonsT } from "~/types/seasons"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const teamSeasons = await $fetch<ResponseWrapperT<SeasonsT>>(
    process.env.API_BASE_URL + '/teams/seasons', 
    { 
      params: { team: query.teamId },
      headers: { 'x-apisports-key': process.env.X_APISPORTS_KEY ?? '' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return teamSeasons
})
