export interface TeamsSquadT {
  team: {
    id: number
    name: string
    logo: string
  },
  players: {
    id: number
    name: string
    age: number
    number: number
    position: keyof typeof ShortPositions
    photo: string
  }[]
}

export enum ShortPositions {
  'Goalkeeper' = 'G',
  'Defender' = 'D',
  'Midfielder' = 'M',
  'Attacker' = 'F',
}
