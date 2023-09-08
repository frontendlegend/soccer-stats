import { ResponseWrapperT } from "~/types/api"
import { FixturesT } from "~/types/fixtures"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const leagueFixtures = await $fetch<ResponseWrapperT<FixturesT>>(
    (process.env.API_BASE_URL ?? event.context.env.API_BASE_URL) + '/fixtures', 
    { 
      params: { league: query.leagueId, season: query.season, round: query.round },
      headers: { 
        'x-apisports-key': 
          (process.env.X_APISPORTS_KEY ?? event.context.env.X_APISPORTS_KEY) ?? '' 
      }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueFixtures
})
