<template>
  <NuxtLayout>
    <div class="home-page">
      <FavoriteLeagues />
      <SearchLeagues />
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
  .home-page {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
</style>
