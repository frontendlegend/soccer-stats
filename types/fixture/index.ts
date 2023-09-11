export interface FixtureT {
  fixture: {
    id: number
    referee: string
    timezone: string
    date: string
    timestamp: number
    periods: {
      first: number | null
      second: number | null
    }
    venue: {
      id: number
      name: string
      city: string
    }
    status: {
      long: string
      short: string
      elapsed: number | null
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    round: string
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
    away: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
  }
  goals: ScoreT
  score: {
    halftime: ScoreT
    fulltime: ScoreT
    extratime: ScoreT
    penalty: ScoreT
  }
}
interface ScoreT {
  home: number | null
  away: number | null
}
export type FixturesT = FixtureT[]
