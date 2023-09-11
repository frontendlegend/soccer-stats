<template>
  <div class="fixture-stats" v-if="fixtureStatistics?.length">
    <h4 class="fixture-stats__title">Statistics</h4>

    <div class="fixture-stats__sides">
      <div 
        class="fixture-stats__sides__side"
        v-for="team in fixtureStatistics"    
      >
        <ul class="fixture-stats__sides__side__list">
          <li 
            class="fixture-stats__sides__side__list__item"
            v-for="statistic in team.statistics"  
          >
            <span class="fixture-stats__sides__side__list__item__type">
              {{ statistic.type }}
            </span>
            <b class="fixture-stats__sides__side__list__item__value">
              {{ statistic.value || 0 }}
            </b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FixtureStatisticsT } from '~/types/fixture/statistics';
  import { FixtureT } from '~/types/fixture';

  const props = defineProps<{ fixture: FixtureT | null }>()

  const { data: fixtureStatistics } = 
    await useFetch<FixtureStatisticsT>('/api/fixture/stats', {
      params: { fixture: props.fixture?.fixture.id }
    })
</script>

<style scoped lang="scss">
  .fixture-stats {
    &__title {
      margin: 0 0 16px;
      text-align: center;
    }

    &__sides {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      &__side {
        &:first-child {
          text-align: end;
        }
        &:not(:first-child) {
          direction: rtl;
        }

        &__list {
          margin: 0;
          padding: 0;
          list-style: none;

          &__item {
            display: flex;
            justify-content: space-between;
            width: 100%;
            border-bottom: 1px dashed $gray;

            &__type {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>
