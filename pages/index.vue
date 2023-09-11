<template>
  <NuxtLayout>
    <div class="home-page">
      <CommonFavoriteLeagues />
      <HomeSearchLeagues />
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
