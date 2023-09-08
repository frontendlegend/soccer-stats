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
    await $fetch<ResponseWrapperT<LeaguesT>>(
      (process.env.API_BASE_URL ?? event.context.env.API_BASE_URL) + '/leagues', 
      { 
        params: { id: favoriteLeaguesIds.split(',')[i] },
        headers: { 
          'x-apisports-key': 
            (process.env.X_APISPORTS_KEY ?? event.context.env.X_APISPORTS_KEY) ?? '' 
        }
      }
    )
      .then(res => favoriteLeagues.push(res.response[0]))
      .catch(err => console.error({ err }))
  }

  return favoriteLeagues
})
