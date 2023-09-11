<template>
  <div class="favorite-leagues">
    <h5 class="favorite-leagues__title" v-text="'Favorites'" />
    
    <NuxtLink
      class="favorite-leagues__link"
      v-for="favoriteLeague in favoriteLeagues"
      :to="`/league-${favoriteLeague.league.id}`"
    >
      <div class="favorite-leagues__league" >
        <img 
          class="favorite-leagues__league__logo" 
          :src="favoriteLeague.league.logo" 
        />
        <span 
          class="favorite-leagues__league__name" 
          v-text="favoriteLeague.league.name" 
        />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  const { data: favoriteLeagues } = await useFetch('/api/favorite/leagues')
</script>

<style scoped lang="scss">
  .favorite-leagues {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    cursor: default;

    &__title {
      margin: 0;
    }

    &__link {
      color: $blue;
      text-decoration: none;
      
      &:visited {
        color: $blue;
      }
    }

    &__league {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background: lighten($gray, 35%);
      }

      &__logo {
        height: 16px;
      }
    }
  }
</style>
