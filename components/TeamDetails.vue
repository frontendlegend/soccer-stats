<template>
  <div class="team-details">
    <div class="team-details__team">
      <div class="team-details__team__main">
        <h4 class="team-details__team__main__name" v-text="props.team?.team.name" />
        <img class="team-details__team__main__image" :src="props.team?.team.logo" />
        <div class="team-details__team__main__founded-field">
          <span v-text="'year founded '" />
          <b v-text="props.team?.team.founded" />
        </div>
      </div>
    </div>

    <div class="team-details__team__venue">
      <img 
        class="team-details__team__venue__image" 
        :src="props.team?.venue.image" 
      />
      <div class="team-details__team__venue__name-field">
        <span v-text="'venue '" />
        <b v-text="props.team?.venue.name" />
      </div>
      <div class="team-details__team__venue__address-field">
        <span v-text="'address '" />
        <b v-text="props.team?.venue.address" />
      </div>
      <div class="team-details__team__venue__capacity-field">
        <span v-text="'capacity '" />
        <b v-text="props.team?.venue.capacity" />
      </div>
    </div>

    <div class="team-details__location">
      <div class="team-details__location__country">
        <img 
          class="team-details__location__country__image" 
          :src="props.league?.country.flag" 
        />
        <p 
          class="team-details__location__country__title" 
          v-text="props.league?.country.name" 
        />
      </div>
    
      <NuxtLink 
        class="team-details__location__league"
        :to="`/league-${league?.league.id}`"
      >
        <img 
          class="team-details__location__league__image" 
          :src="props.league?.league.logo" 
        />
        <p 
          class="team-details__location__league__title" 
          v-text="props.league?.league.name" 
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { LeagueT } from '~/types/leagues';
  import { TeamT } from '~/types/team';

  const props = defineProps<{ 
    league: LeagueT | null 
    team: TeamT | null
  }>()
</script>

<style scoped lang="scss">
  .team-details {
    width: 100%;
    max-width: 160px;

    &__team {
      margin-bottom: 14px;
      text-align: center;

      &__main {
        &__name {
          margin: 0 0 11px;
        }
        &__image {
          width: 96px;
          margin-bottom: 11px;
        }
        &__founded-field {
          font-size: 10px;
        }
      }

      &__venue {
        margin-bottom: 24px;
        font-size: 10px;

        &__image {
          width: 100%;
          margin-bottom: 8px;
        }
        &__name-field, &__address-field {
          margin-bottom: 3px;
        }
      }
    }

    &__location {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &__country, &__league {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;

        &__image {
          width: 24px;
        }
        &__title {
          margin: 0;
        }
      }

      &__league {
        color: $blue;
        text-decoration: none;
        &:visited {
          color: $blue;
        }
      }
    }
  }
</style>
