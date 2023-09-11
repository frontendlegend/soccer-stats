<template>
  <div class="search-leagues">
    <div class="search-leagues__variants">
      <div class="search-leagues__variants__variant">
        <h3 
          class="search-leagues__variants__variant__title"
          v-text="'All Leagues'"
        />
        <p 
          class="search-leagues__variants__variant__description" 
          v-text="'without a filter'"
        />
        <button 
          class="search-leagues__variants__variant__button"
          @click="() => fetchLeagues()"
          v-text="'Get all leagues'"
          :disabled="isSearching"
        />
      </div>
  
      <div class="search-leagues__variants__variant">
        <LeagueNameInput 
          :value="leagueNameQuery"
          @on-value-change="newValue => leagueNameQuery = newValue"
        />
        <button 
          class="search-leagues__variants__variant__button"
          @click="() => fetchLeagues({ 
            key: 'search', 
            value: leagueNameQuery.length > 2 ? leagueNameQuery : undefined 
          })"
          v-text="'Search by name'"
          :disabled="leagueNameQuery.length <= 2 || isSearching"
        />
      </div>
  
      <div class="search-leagues__variants__variant">
        <HomeCountrySearchSelect 
          :selected-country="selectedCountry" 
          @on-select-country="country => selectedCountry = country"
        />
        <button 
          class="search-leagues__variants__variant__button"
          @click="() => fetchLeagues({ 
            key: 'country', 
            value: selectedCountry?.name
          })"
          v-text="'Search by country'"
          :disabled="!selectedCountry || isSearching"
        />
      </div>
    </div>

    <ul class="search-leagues__results">
      <NuxtLink
        class="search-leagues__results__link"
        v-for="league in leagues" 
        :to="`/league-${league.league.id}`"  
      >
        <li class="search-leagues__results__item">
          <img 
            class="search-leagues__results__item__flag" 
            v-if="league.country.flag"
            :src="league.country.flag" 
          />
          <img 
            class="search-leagues__results__item__logo" 
            :src="league.league.logo" 
          />
          <span 
            class="search-leagues__results__item__name" 
            v-text="league.league.name" 
          />
        </li>
      </NuxtLink>
    </ul>

    <p class="search-leagues__loading" v-if="isSearching" v-text="'loading...'" />
    <p class="search-leagues__loading" v-else-if="!leagues.length" v-text="'no results :c'" />
  </div>
</template>

<script setup lang="ts">
  import { CountryT } from '~/types/countries';
  import { LeaguesT } from '~/types/league';

  const selectedCountry = ref<CountryT | null>(null)
  const leagueNameQuery = ref<string>('')

  const leagues = ref<LeaguesT>([])
  const isSearching = ref<boolean>(false)

  async function fetchLeagues(query?: { key: string, value?: string }) {
    isSearching.value = true

    return $fetch<LeaguesT>('/api/leagues', { 
      params: query && { [query.key]: query.value }
    })
      .then(res => leagues.value = res)
      .catch(err => console.error({ err }))
      .finally(() => isSearching.value = false)
  }
  await fetchLeagues()
</script>

<style scoped lang="scss">
  .search-leagues {
    display: flex;
    flex-direction: column;
    gap: 32px;
    cursor: default;

    &__variants {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 48px;

      &__variant {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 110px;

        &__title {
          margin: 8px 0 0;
        }
        &__description {
          margin: 0;
          font-size: 12px;
        }
        &__button {
          width: 100%;
          margin-top: auto;
          cursor: pointer;

          &:disabled {
            cursor: not-allowed;
          }
        }
      }
    }

    &__results {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 55vh;
      margin: 0;
      padding: 0;

      list-style: none;
      overflow-y: auto;

      &__link {
        color: $blue;
        text-decoration: none;

        &:visited {
          color: $blue;
        }
      }

      &__item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;

        &:hover {
          background: lighten($gray, 35%);
        }

        &__flag {
          height: 16px;
          height: 16px;
        }
        &__logo {
          width: 64px;
          height: 32px;
          object-fit: contain;
        }

        &__name {
          font-size: 18px;
        }
      }
    }

    &__loading {
      margin: 0;
    }
  }
</style>
