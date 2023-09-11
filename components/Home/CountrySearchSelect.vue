<template>
  <div class="search-countries">
    <CommonSearchSelect
      id="search-countries"
      label="Country name"
      placeholder="Find & select country"
      :value="searchQuery || (selectedCountry?.name ?? searchQuery)"
      @on-input="onSearchQueryInput"
      :helper="inputHelper"
    >
      <template #list-item v-if="countries.length">
        <li 
          class="search-countries__results__item" 
          v-for="country in countries"
          @click="() => onCountrySelect(country)"
        >
          <img class="search-countries__results__item__flag" :src="country.flag" />
          <span class="search-countries__results__item__name" v-text="country.name" />
          <span class="search-countries__results__item__code" v-text="country.code" />
        </li>
      </template>
    </CommonSearchSelect>
  </div>
</template>

<script setup lang="ts">
  import { CountriesT, CountryT } from '~/types/countries';

  const props = defineProps<{ selectedCountry: CountryT | null }>()
  const emit = defineEmits<{ 
    (e: 'onSelectCountry', country: typeof props.selectedCountry): void 
  }>()

  const searchQuery = ref<string>('')
  const isSearching = ref<boolean>(false)
  const inputHelper = computed(() => {
    if (props.selectedCountry)
      return 'country selected'
    else if (countries.value.length || props.selectedCountry) 
      return undefined
    else if (isSearching.value) 
      return 'searching...'
    else if (searchQuery.value.length > 2)
      return 'not found'
    else 
      return !searchQuery.value.length
        ? 'type at least 3 chars'
        : searchQuery.value.length < 3
          ? `type ${3 - searchQuery.value.length} more ` + 
            `char${searchQuery.value.length > 1 ? '' : 's'}`
          : ''
  })

  const countries = ref<CountriesT>([])
  // TODO: throttle
  function onSearchQueryInput(newSearchQuery: string) {
    searchQuery.value = newSearchQuery

    if (props.selectedCountry && newSearchQuery !== props.selectedCountry.name) 
      emit('onSelectCountry', null)

    if (newSearchQuery.length > 2) {
      isSearching.value = true

      $fetch<CountriesT>('/api/countries', { params: { search: newSearchQuery }})
        .then(res => countries.value = res)
        .catch(err => console.error({ err }))
        .finally(() => isSearching.value = false)
    
    } else countries.value = []
  }

  function onCountrySelect(country: CountryT) {
    searchQuery.value = ''
    emit('onSelectCountry', country)
    countries.value = []
  }
</script>

<style scoped lang="scss">
  .search-countries__results__item {
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: lighten($gray, 35%);
    }

    &__flag {
      height: 14px;
    }
    &__name {
      margin-left: 5px;
    }
    &__code {
      margin-left: auto;
      font-weight: 600;
    }
  }
</style>
