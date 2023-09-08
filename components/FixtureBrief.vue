<template>
  <div class="fixture-brief">
    <div class="fixture-brief__score">
      <div class="fixture-brief__score__team">
        <NuxtLink class="fixture-brief__score__team__link" :to="
          `/league-${props.fixture?.league.id}` 
          + `/team-${props.fixture?.teams.home.id}`
        ">
          <b class="fixture-brief__score__team__name">
            {{ props.fixture?.teams.home.name }}
          </b>
        </NuxtLink>
      </div>

      <div class="fixture-brief__score__goals">
        <span class="fixture-brief__score__goals__side">
          {{ props.fixture?.goals.home }}
        </span>
        <span class="fixture-brief__score__goals__divider">
          :
        </span>
        <span class="fixture-brief__score__goals__side">
          {{ props.fixture?.goals.away }}
        </span>
      </div>

      <div class="fixture-brief__score__team">
        <NuxtLink class="fixture-brief__score__team__link" :to="
          `/league-${props.fixture?.league.id}` 
          + `/team-${props.fixture?.teams.away.id}`
        ">
          <b class="fixture-brief__score__team__name">
            {{ props.fixture?.teams.away.name }}
          </b>
        </NuxtLink>
      </div>
    </div>
    
    <div v-if="props.fixture" class="fixture-brief__date">
      <client-only>
        {{ new Date(props.fixture.fixture.date).toLocaleString() }}
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FixtureT } from '~/types/fixtures';

  const props = defineProps<{ fixture: FixtureT | null }>()
</script>

<style scoped lang="scss">
  .fixture-brief {
    &__score {
      display: grid;
      grid-template-columns: 1fr .2fr 1fr;
      justify-content: center;
      align-items: center;
      gap: 32px;
      text-align: center;
      font-size: 24px;

      &__team {
        &__link {
          color: $blue;
          text-decoration: none;

          &:visited {
            color: $blue;
          }
        }
      }

      &__goals {
        display: flex;
        align-items: center;
        gap: 24px;
        font-size: 32px;
        font-weight: 600;
      }
    }
    &__date {
      height: 17px;
      margin-top: 16px;
      text-align: center;
      font-size: 14px;
      color: $gray;
    }
  }
</style>
