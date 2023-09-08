import { ResponseWrapperT } from "~/types/api"
import { TeamStatisticsT } from "~/types/team-statistics"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // TODO: api base url and api secret env
  const teamStatistics = await $fetch<ResponseWrapperT<TeamStatisticsT>>(
    'https://v3.football.api-sports.io' + '/teams/statistics', 
    { 
      params: { league: query.league, season: query.season, team: query.team },
      headers: { 'x-apisports-key': 'abc8fdd1fc3a728891db00efeed4ae1a' }
    }
  )
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return teamStatistics
})
