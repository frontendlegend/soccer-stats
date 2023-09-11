<!-- TODO: cups current round -->
<template>
  <div class="league-fixtures">
    <h5 class="league-fixtures__title" v-text="'Fixtures'" />

    <div class="league-fixtures__round">
      <h6 class="league-fixtures__round__title" v-text="'Round'" />

      <select 
        class="league-fixtures__round__select"
        @change="e => selectedRound = (e.target as HTMLSelectElement).value"  
      >
        <option 
          class="league-fixtures__round__select__item"
          v-for="round in leagueRounds" 
          v-text="`${round} ${round === leagueRoundsCurrent?.[0] ? '(current)' : ''}`"
          :value="round" 
          :selected="round === selectedRound"
        />
      </select>
    </div>

    <ul class="league-fixtures__list">
      <li 
        class="league-fixtures__list__item"
        v-for="fixture in leagueFixtures"
      >
        <NuxtLink
          :class="{
            'league-fixtures__list__item__link': true,
            'league-fixtures__list__item__link--disabled': fixture.fixture.status.short !== 'FT'
          }"
          :to="`/fixture-${fixture.fixture.id}`"
        >
          <div class="league-fixtures__list__item__info">
            <span class="league-fixtures__list__item__info__team">
              <span 
                class="league-fixtures__list__item__info__team__name" 
                v-text="fixture.teams.home.name"
              />
              <img 
                class="league-fixtures__list__item__info__team__logo" 
                :src="fixture.teams.home.logo" 
              />
            </span>

            <span class="league-fixtures__list__item__info__score">
              {{ fixture.goals.home }} - {{ fixture.goals.away }}
            </span>

            <span class="league-fixtures__list__item__info__team">
              <img 
                class="league-fixtures__list__item__info__team__logo" 
                :src="fixture.teams.away.logo" 
              />
              <span 
                class="league-fixtures__list__item__info__team__name" 
                v-text="fixture.teams.away.name"
              />
            </span>
          </div>

          <p class="league-fixtures__list__item__date">
            <client-only>
              {{ new Date(fixture.fixture.date).toLocaleString() }}
            </client-only>
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ 
    leagueId: number
    season: number | undefined 
  }>()

  const { data: leagueRounds } = await useFetch('/api/league/rounds', {
    params: { leagueId: props.leagueId, season: props.season }
  })
  const { data: leagueRoundsCurrent } = await useFetch('/api/league/rounds', {
    params: { leagueId: props.leagueId, season: props.season, current: true }
  })

  const selectedRound = ref(leagueRoundsCurrent.value?.[0])

  const { data: leagueFixtures } = 
    await useAsyncData(
      'league-fixtures',
      () => $fetch('/api/league/fixtures', { params: { 
        leagueId: props.leagueId, 
        season: props.season, 
        round: selectedRound.value 
      }}),
      { watch: [selectedRound] }
    )
</script>

<style scoped lang="scss">
  .league-fixtures {
    cursor: default;

    &__title {
      margin: 0 0 16px;
      text-align: center;
    }

    &__round {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;

      &__title {
        margin: 0;
      }

      &__select {
        cursor: pointer;
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin: 0;
      padding: 0;
      list-style: none;

      &__item {
        padding: 2px 0;
        font-size: 14px;

        &:hover {
          background: lighten($gray, 35%);
        }

        &__link {
          color: $blue;
          text-decoration: none;
          cursor: pointer;

          &:visited:not(&--disabled) {
            color: $blue;
          }
          &--disabled {
            color: $text;
            pointer-events: none;
            cursor: default;
          } 
        }

        &__info {
          display: grid;
          grid-template-columns: 1fr .25fr 1fr;
          align-items: center;
          gap: 8px;

          &__team {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
  
            &:first-child {
              justify-content: end;
              text-align: end;
            }

            &__logo {
              width: 16px;
              height: 16px;
            }
          }
  
          &__score {
            text-align: center;
          }
        }

        &__date {
          height: 15px;
          margin: 2px 0 0;
          text-align: center;
          font-size: 12px;
          color: $gray;
        }
      }
    }
  }
</style>
