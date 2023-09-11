interface FixtureStatisticT {
  team: {
    id: number
    name: string
    logo: string
  },
  statistics: {
    type: string
    value: number
  }[]
}
export type FixtureStatisticsT = FixtureStatisticT[]
