import { ResponseWrapperT } from "~/types/api"
import { TeamStatisticsT } from "~/types/team/statistics"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const teamStatistics = await soccerApi<ResponseWrapperT<TeamStatisticsT>>({
    prodEnv: event.context.env, 
    path: '/teams/statistics', 
    params: { league: query.league, season: query.season, team: query.team },
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))

  return teamStatistics
})
