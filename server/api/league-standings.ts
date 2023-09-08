import { ResponseWrapperT } from "~/types/api"
import { LeagueStandingsT } from "~/types/league-standings"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const leagueStandings = await $fetch<ResponseWrapperT<[LeagueStandingsT]>>(
    (process.env.API_BASE_URL ?? event.context.env.API_BASE_URL) + '/standings', 
    { 
      params: { league: query.leagueId, season: query.season },
      headers: { 
        'x-apisports-key': 
          (process.env.X_APISPORTS_KEY ?? event.context.env.X_APISPORTS_KEY) ?? '' 
      }
    }
  )
    .then(res => res.response[0])
    .catch(err => console.error({ err }))

  return leagueStandings
})
