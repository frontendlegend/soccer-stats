<template>
  <div class="last-fixtures">
    <h5 class="last-fixtures__title" v-text="'Results'" />

    <ul class="last-fixtures__list">
      <li 
        class="last-fixtures__list__item"
        v-for="fixture, idx in lastFixtures"
      >
        <NuxtLink 
          class="last-fixtures__list__item__link"
          :to="`/fixture-${fixture.fixture.id}`"
        >
          <p class="last-fixtures__list__item__name">
            <b>({{ fixture.teams.home.id === props.teamId ? 'h' : 'a' }})</b>
            {{ lastEnemies?.[idx].name }}
          </p>

            <img 
              class="last-fixtures__list__item__image"        
              :src="lastEnemies?.[idx].logo" 
            />
            <p :class="{
              'last-fixtures__list__item__score': true,
              'last-fixtures__list__item__score--d': getResultChar(fixture) === 'd',
              'last-fixtures__list__item__score--w': getResultChar(fixture) === 'w',
              'last-fixtures__list__item__score--l': getResultChar(fixture) === 'l',
            }">
            <b v-text="`(${getResultChar(fixture)})`" /> 
            {{ fixture.goals.home }} - {{ fixture.goals.away }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { FixtureT, FixturesT } from '~/types/fixtures';

  const props = defineProps<{
    leagueId: number
    season: number
    teamId: number
  }>()

  const { data: lastFixtures } = await useFetch<FixturesT>(
    '/api/team-fixtures', {
      params: {
        league: props.leagueId,
        season: props.season,
        team: props.teamId,
        last: 5
      }
    }
  )

  const lastEnemies = computed(() => {
    return lastFixtures.value?.map(fixture => {
      if (fixture.teams.home.id !== props.teamId) 
        return fixture.teams.home
      else
        return fixture.teams.away
    })
  })

  function getResultChar(fixture: FixtureT): 'd' | 'w' | 'l' {
    return fixture.goals.home === fixture.goals.away
      ? 'd'
      : fixture.teams.home.id === props.teamId 
        ? fixture.teams.home.winner ? 'w' : 'l'
        : fixture.teams.away.winner ? 'w' : 'l'
  }

  const goToTeam = (id: number): void => {
    
  }
</script>

<style scoped lang="scss">
  .last-fixtures {
    height: fit-content;

    &__title {
      margin: 0 0 12px;
    }

    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 16px;
      margin: 0;
      padding: 0;
      list-style: none;
      overflow-x: auto;

      &__item {
        text-align: center;

        &__link {
          color: $blue;
          text-decoration: none;
          &:visited {
            color: $blue;
          }
        }

        &__name {
          margin: 0 0 8px;
          font-size: 12px;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 87px;
        }
        &__image {
          width: 64px;
          height: 64px;
          object-fit: contain;
        }
        &__score {
          margin: 8px 0 0;
          font-size: 13px;

          &--d {
            color: lighten(gray, 5%);
          }
          &--w {
            color: lighten(green, 10%);
          }
          &--l {
            color: darken(red, 5%);
          }
        }
      }
    }
  }
</style>
