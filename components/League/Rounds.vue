<template>
  <div class="league-rounds">
    <h5 class="league-rounds__title" v-text="'Rounds'" />

    <ul class="league-rounds__list">
      <li 
        v-for="round in leagueRounds"  
        :class="{
          'league-rounds__list__item': true,
          'league-rounds__list__item--current': props.current === round
        }"
        v-text="round"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { LeagueRoundsT } from '~/types/league/rounds';

  const props = defineProps<{ current: string | undefined }>()

  const { data: leagueRounds } = 
    await useFetch<LeagueRoundsT>('/api/league/rounds')

  onMounted(() => {
    const currentRoundElement = document
      .getElementsByClassName('league-rounds__list__item--current')[0] as HTMLElement
    const roundTitleElement = document
      .getElementsByClassName('league-rounds__title')[0] as HTMLElement

    roundTitleElement.style.left = 
      currentRoundElement.offsetLeft - (currentRoundElement.offsetWidth / 2)
      + 'px'
  })
</script>

<style scoped lang="scss">
  .league-rounds {
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    height: 40px;
    position: relative;

    &__title {
      margin: 0 0 8px 4px;
      position: absolute;
    }

    &__list {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      margin: 24px 0 0;
      padding: 0;

      font-size: 12px;
      list-style: none;

      &__item {
        cursor: pointer;

        &:hover {
          color: $blue;
        }

        &--current {
          font-weight: 600;
          color: $blue;
        }
      }
    }
  }
</style>
