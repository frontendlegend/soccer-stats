<!-- TODO: cups group standings -->
<template>
  <div class="league-standings">
    <h5 class="league-standings__title" v-text="'Standings'" />

    <table class="league-standings__table">
      <thead>
        <tr>
          <th>Club</th>
          <th>MP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GD</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="league-standings__table__row"
          v-for="standing in leagueStandings?.league.standings[0]"
          @click="() => onStandingsRowClick(standing.team.id)"
        >
          <td class="league-standings__table__row__data--club">
            <span 
              class="league-standings__table__row__data--club__rank" 
              v-text="standing.rank" 
            />
            <img 
              class="league-standings__table__row__data--club__logo" 
              :src="standing.team.logo" 
            />
            <span 
              class="league-standings__table__row__data--club__name" 
              v-text="standing.team.name"  
            />
          </td>

          <td 
            class="league-standings__table__row__data--played"
            v-text="standing.all.played"
          />
          <td 
            class="league-standings__table__row__data--win"
            v-text="standing.all.win"
          />
          <td 
            class="league-standings__table__row__data--draw"
            v-text="standing.all.draw"
          />
          <td 
            class="league-standings__table__row__data--lose"
            v-text="standing.all.lose"
          />
          <td 
            class="league-standings__table__row__data--diff"
            v-text="standing.all.goals.for - standing.all.goals.against"
          />
          <td 
            class="league-standings__table__row__data--points"
            v-text="standing.points"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { LeagueStandingsT } from '~/types/league/standings';

  const props = defineProps<{ 
    leagueId: number
    season: number | undefined 
  }>()

  const { data: leagueStandings } = 
    await useFetch<LeagueStandingsT>('/api/league/standings', {
      params: { leagueId: props.leagueId, season: props.season }
    })

  const route = useRoute()
  const router = useRouter()

  function onStandingsRowClick(teamId: number) {
    router.push({ path: `${route.path}/team-${teamId}` })
  }
</script>

<style scoped lang="scss">
  .league-standings {
    width: fit-content;
    cursor: default;

    &__title {
      margin: 0 0 16px;
      text-align: center;
    }

    &__table {
      font-size: 14px;
      border-collapse: collapse;

      thead > tr > th {
        font-size: 12px;
        font-weight: 400;
      }

      // space between thead & tbody
      tbody::before {
        content: "@";
        display: block;
        line-height: 10px;
        visibility: hidden;
      }

      &__row {
        &:hover {
          background: lighten($gray, 35%);
          cursor: pointer;
        }

        &__data {
          &--club {
            display: flex;
            padding: 2px 8px 2px 0;

            &__rank {
              width: 16px;
              margin-right: 4px;
              font-size: 12px;
              text-align: center;
            }
            &__logo {
              width: 16px;
              height: 16px;
              margin-right: 8px;
            }
            &__name {
              color: $blue;
            }
          }

          &--played, &--win, &--draw, &--lose, &--diff, &--points {
            padding: 0 8px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
