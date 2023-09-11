<template>
  <div class="fixture-events">
    <h4 class="fixture-events__title">Events</h4>

    <div class="fixture-events__side">
      <img 
        class="fixture-events__side__logo"
        :src="fixture?.teams.home.logo" 
      />
    </div>

    <div class="fixture-events__timeline">
      <div 
        class="fixture-events__timeline__event"
        v-for="event in fixtureEvents"
      >
        <div 
          class="fixture-events__timeline__event__point" 
          :style="{ 
            top: '-15px',
            left: 600 / 90 * event.time.elapsed - 15 + 'px' 
          }"
          v-text="`${event.time.elapsed}'`"
        />
        <div 
          class="fixture-events__timeline__event__descr" 
          :style="{ 
            top: event.team.id === fixture?.teams.home.id 
              ? '-90px'
              : '20px'
            ,
            left: 600 / 90 * event.time.elapsed - 35 + 'px' 
          }"
        >
          <p class="fixture-events__timeline__event__descr__type">
            {{ event.type }}
          </p>
          <p class="fixture-events__timeline__event__descr__player">
            {{ event.player.name }}
          </p>
        </div>
      </div>
    </div>

    <div class="fixture-events__side">
      <img 
        class="fixture-events__side__logo"
        :src="fixture?.teams.away.logo" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FixtureEventsT } from '~/types/fixture/events';
  import { FixtureT } from '~/types/fixture';

  const props = defineProps<{ fixture: FixtureT | null }>()

  const { data: fixtureEvents } = await useFetch<FixtureEventsT>(
    '/api/fixture/events', {
      params: { fixture: props.fixture?.fixture.id }
    }
  )
</script>

<style scoped lang="scss">
  .fixture-events {
    padding: 0 0 32px;

    &__title {
      margin: 0 0 48px;
      text-align: center;
    }

    &__side {
      &__logo {
        height: 50px;
      }
    }

    &__timeline {
      position: relative;
      width: 600px;
      height: 3px;
      margin: 8px auto;
      background: lighten($gray, 25%);

      &__event {
        &__point {
          width: 30px;
          height: 30px;

          text-align: center;
          font-size: 12px;
          font-weight: 600;
          line-height: 2.2;

          background: $white;
          border: 1px solid lighten($gray, 15%);
          border-radius: 30px;
          position: absolute;    
        }
        &__descr {
          width: 70px;
          height: 70px;
          padding: 4px;
          background: $white;
          border: 1px solid $gray;
          position: absolute;

          &__type {
            margin: 0;
            font-size: 10px;
          }
          &__player {
            margin: 0;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
