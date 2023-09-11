import { ResponseWrapperT } from "~/types/api"
import { LeaguesT } from "~/types/leagues"
import { initialFavoriteLeaguesIds } from "~/server/utils/constants"

export default defineEventHandler(async (event) => {
  let favoriteLeaguesIds = getCookie(event, 'favoriteLeaguesIds') 

  if (!favoriteLeaguesIds) {
    setCookie(event, 'favoriteLeaguesIds', initialFavoriteLeaguesIds.join())
    favoriteLeaguesIds = initialFavoriteLeaguesIds.join()
  }

  const favoriteLeagues: LeaguesT = []

  for (let i = 0; i < favoriteLeaguesIds.split(',').length; i++) {
    await soccerApi<ResponseWrapperT<LeaguesT>>({
      prodEnv: event.context.env,
      path: '/leagues',
      params: { id: favoriteLeaguesIds.split(',')[i] }
    })
      .then(res => favoriteLeagues.push(res.response[0]))
      .catch(err => console.error({ err }))
  }

  return favoriteLeagues
})
