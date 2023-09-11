interface FixtureLineupT {
  team: {
    id: number
    name: string
    logo: string
    colors: {
      player: {
        primary: string
        number: string
        border: string
      },
      goalkeeper: {
        primary: string
        number: string
        border: string
      }
    }
  }
  formation: string
  startXI: {
    player: {
      id: number
      name: string
      number: number
      pos: string
      grid: string
    }
  }[]
  substitutes: {
    player: {
      id: number
      name: string
      number: number
      pos: string
      grid: null
    }
  }[]
  coach: {
    id: number
    name: string
    photo: string
  }
}
export type FixtureLineupsT = FixtureLineupT[]
