export interface LeagueT {
  league: {
    id: number
    name: string
    type: "League" | "Cup"
    logo: string
  },
  country: {
    name: string
    code: string
    flag: string  // img url
  },
  seasons: {
    year: number
    start: string // date
    end: string   // date
    current: boolean
    coverage: {
      fixtures: {
        events: boolean
        lineups: boolean
        statistics_fixtures: boolean
        statistics_players: boolean
      }
      standings: boolean
      players: boolean
      top_scorers: boolean
      top_assists: boolean
      top_cards: boolean
      injuries: boolean
      predictions: boolean
      odds: boolean
    }
  }[]
}
export type LeaguesT = LeagueT[]
