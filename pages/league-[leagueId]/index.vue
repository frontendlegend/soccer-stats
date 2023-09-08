<template>
  <NuxtLayout>
    <div class="league-page">
      <FavoriteLeagues />
      <Seasons :seasons="leagueSeasons" :current="currentSeason" />

      <div class="league-page__block">
        <LeagueFixtures :league-id="leagueId" :season="currentSeason" />
        <LeagueStandings :league-id="leagueId" :season="currentSeason" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { LeagueT } from '~/types/leagues';
  import { SeasonsT } from '~/types/seasons';

  const route = useRoute()
  const leagueId = Number(route.params.leagueId)

  const { data: league } = 
    await useFetch<LeagueT>('/api/league', { params: { id: leagueId } })
  
  const currentSeason = computed(() =>
    league.value?.seasons.find(season => season.current)?.year
  )

  const { data: leagueSeasons } = 
    await useFetch<SeasonsT>('/api/league-seasons')
</script>

<style scoped lang="scss">
  .league-page {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &__block {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  }
</style>
