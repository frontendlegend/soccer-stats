<template>
  <NuxtLayout>
    <div class="team-page">
      <CommonFavoriteLeagues />
      <CommonSeasons :seasons="teamSeasons" :current="currentSeason" />

      <div class="team-page__content">
        <TeamDetails :league="league" :team="team" />

        <div class="team-page__content__main">
          <TeamLastFixtures 
            :league-id="Number($route.params.leagueId)" 
            :season="currentSeason!" 
            :team-id="Number($route.params.teamId)" 
          />
          <TeamSquad :team-id="Number($route.params.teamId)" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { LeagueT } from '~/types/league';
  import { SeasonsT } from '~/types/seasons';
  import { TeamT } from '~/types/team';
  import { TeamStatisticsT } from '~/types/team/statistics';

  const route = useRoute()

  const { data: league } = 
    await useFetch<LeagueT>('/api/league', { params: { id: route.params.leagueId } })
  
  const currentSeason = computed(() =>
    league.value?.seasons.find(season => season.current)?.year
  )

  const { data: team } = await useFetch<TeamT>('/api/team', {
    params: { id: route.params.teamId }
  })

  const { data: teamSeasons } = 
    await useFetch<SeasonsT>('/api/team/seasons', {
      params: { teamId: route.params.teamId }
    })

  const { data: teamStatistics } = 
    await useFetch<TeamStatisticsT>('/api/team/statistics', {
      params: { 
        league: route.params.leagueId,
        season: currentSeason,
        team: route.params.teamId 
      }
    })
</script>

<style scoped lang="scss">
  .team-page {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &__content {
      display: flex;
      gap: 48px;

      &__main {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
    }
  }
</style>
