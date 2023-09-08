<template>
  <div class="search-select" :id="props.id">
    <CommonInput 
      :wrapperId="props.id + '__input-wrapper'" 
      :inputId="props.id + '__input'" 
      :label="props.label" 
      :placeholder="props.placeholder" 
      :value="value"
      @on-input="newValue => emit('onInput', newValue)"
      :helper="props.helper"
    />

    <ul 
      v-if="slots['list-item']"
      class="search-select__results" 
      :id="props.id + '__results'"
    >
      <slot name="list-item" />
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    id: string
    label: string
    placeholder: string
    value: string
    helper?: string
  }>()

  const emit = defineEmits<{ 
    (e: 'onInput', newValue: string): void 
  }>()
  const slots = useSlots()

  onMounted(() => {
    const inputWrapperElement = document.getElementById('search-countries__input-wrapper')
    const searchCountriesElement = document.getElementById('search-countries')
    const inputElement = document.getElementById('search-countries__input')
    const resultsElement = document.getElementById('search-countries__results')
    
    if (inputWrapperElement && searchCountriesElement) {
      searchCountriesElement.style.width = inputWrapperElement.clientWidth + 'px'
      searchCountriesElement.style.height = inputWrapperElement.clientHeight + 'px'

      if (inputElement && resultsElement)
        resultsElement.style.bottom = (
          '-' 
          + (
              resultsElement.clientHeight 
              + Number(getComputedStyle(inputElement).borderBottomWidth.slice(0, -2))
            ) 
          + 'px'
        )
    }
  })
</script>

<style scoped lang="scss">
  .search-select {
    position: relative;

    &__results {
      width: inherit;
      max-height: 100px;
      margin: 0;
      padding: 0;

      background: $white;
      border: 1px solid $gray;
      border-top: none;
      
      list-style: none;
      overflow: auto;
      opacity: .9;

      position: absolute;
      left: 0;
    }
  }
</style>
