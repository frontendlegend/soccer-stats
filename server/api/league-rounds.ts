import { ResponseWrapperT } from "~/types/api"
import { LeagueRoundsT } from "~/types/league-rounds"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const leagueRounds = await $fetch<ResponseWrapperT<LeagueRoundsT>>(
    (process.env.API_BASE_URL ?? event.context.env.API_BASE_URL) + '/fixtures/rounds', 
    { 
      params: { league: query.leagueId, season: query.season, current: query.current },
      headers: { 
        'x-apisports-key': 
          (process.env.X_APISPORTS_KEY ?? event.context.env.X_APISPORTS_KEY) ?? '' 
      }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return leagueRounds
})
