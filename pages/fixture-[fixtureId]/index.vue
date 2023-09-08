<template>
  <NuxtLayout>
    <div class="fixture-page">
      <FavoriteLeagues />

      <FixtureBrief :fixture="fixture" />
      <FixtureLineups :fixture="fixture" />
      <FixtureEvents :fixture="fixture" />
      <FixtureStatistics :fixture="fixture" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { FixtureT } from '~/types/fixtures';

  const route = useRoute()

  const { data: fixture } = await useFetch<FixtureT>(
    '/api/fixture', {
      params: { fixture: route.params.fixtureId }
    }
  )
</script>

<style scoped lang="scss">
  .fixture-page {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-bottom: 32px;
  }
</style>
