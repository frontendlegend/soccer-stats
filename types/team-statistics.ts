export interface TeamStatisticsT {
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
  }
  team: {
    id: number
    name: string
    logo: string
  }
  form: string
  fixtures: {
    played: TeamStatisticsSidesT
    wins: TeamStatisticsSidesT
    draws: TeamStatisticsSidesT
    loses: TeamStatisticsSidesT
  }
  goals: {
    for: TeamStatisticsGoalsT
    against: TeamStatisticsGoalsT
  }
  biggest: {
    streak: {
      wins: number
      draws: number
      loses: number
    }
    wins: TeamStatisticsSidesT
    loses: TeamStatisticsSidesT
    goals: {
      for: TeamStatisticsSidesT
      against: TeamStatisticsSidesT
    }
  }
  clean_sheet: TeamStatisticsSidesT
  failed_to_score: TeamStatisticsSidesT
  penalty: {
    scored: TeamStatisticsActionByMinuteT
    missed: TeamStatisticsActionByMinuteT
    total: number
  }
  lineups: {
    formation: string
    played: number
  }[]
  cards: {
    yellow: TeamStatisticsActionMinutesT
    red: TeamStatisticsActionMinutesT
  }
}

interface TeamStatisticsSidesT {
  home: number | string | null
  away: number | string | null
  total?: number | string
}
interface TeamStatisticsGoalsT {
  total: TeamStatisticsSidesT
  average: TeamStatisticsSidesT
  minute: TeamStatisticsActionMinutesT
}

interface TeamStatisticsActionMinutesT {
  "0-15": TeamStatisticsActionByMinuteT,
  "16-30": TeamStatisticsActionByMinuteT,
  "31-45": TeamStatisticsActionByMinuteT,
  "46-60": TeamStatisticsActionByMinuteT,
  "61-75": TeamStatisticsActionByMinuteT,
  "76-90": TeamStatisticsActionByMinuteT,
  "91-105": TeamStatisticsActionByMinuteT,
  "106-120": TeamStatisticsActionByMinuteT
}
interface TeamStatisticsActionByMinuteT {
  total: number | null
  percentage: string | null
}
