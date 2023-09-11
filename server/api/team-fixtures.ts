import { ResponseWrapperT } from "~/types/api"
import { FixturesT } from "~/types/fixtures"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const teamFixtures = await soccerApi<ResponseWrapperT<FixturesT>>({
    prodEnv: event.context.env,
    path: '/fixtures',
    params: { 
      league: query.league, 
      season: query.season, 
      team: query.team,
      last: query.last 
    }
  })
    .then(res => res.response)
    .catch(err => console.error({ err }))
  
  return teamFixtures
})
