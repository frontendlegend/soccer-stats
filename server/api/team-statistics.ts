import { ResponseWrapperT } from "~/types/api"
import { TeamStatisticsT } from "~/types/team-statistics"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const teamStatistics = await $fetch<ResponseWrapperT<TeamStatisticsT>>(
    process.env.API_BASE_URL + '/teams/statistics', 
    { 
      params: { league: query.league, season: query.season, team: query.team },
      headers: { 'x-apisports-key': process.env.X_APISPORTS_KEY ?? '' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return teamStatistics
})
