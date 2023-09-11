export function soccerApi<T>({ prodEnv, path, params, body }: {
  prodEnv?: NodeJS.ProcessEnv,
  path: string,
  params?: Record<string, any>,
  body?: BodyInit | Record<string, any>
}) {
  return $fetch<T>(
    (prodEnv?.API_BASE_URL ?? process.env.API_BASE_URL) + path, 
    { 
      headers: { 
        'x-apisports-key': 
          (prodEnv?.X_APISPORTS_KEY ?? process.env.X_APISPORTS_KEY) ?? '' 
      },
      params,
      body
    }
  )
}
