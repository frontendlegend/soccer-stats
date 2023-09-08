<!-- TODO: change season -->
<template>
  <div class="seasons">
    <h5 class="seasons__title">Season</h5>

    <ul class="seasons__list">
      <li 
        v-for="season in props.seasons"  
        :class="{
          'seasons__list__item': true,
          'seasons__list__item--current': props.current === season
        }"
        v-text="season"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { SeasonsT } from '~/types/seasons';

  const props = defineProps<{ 
    current: number | undefined 
    seasons: SeasonsT | null
  }>()

  onMounted(() => {
    const currentSeasonElement = document
      .getElementsByClassName('seasons__list__item--current')[0] as HTMLElement
    const seasonTitleElement = document
      .getElementsByClassName('seasons__title')[0] as HTMLElement

    seasonTitleElement.style.left = 
      currentSeasonElement.offsetLeft - (currentSeasonElement.offsetWidth / 2)
      + 'px'
    seasonTitleElement.style.visibility = 'visible'
    seasonTitleElement.style.opacity = '1'
  })
</script>

<style scoped lang="scss">
  .seasons {
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    height: 40px;
    position: relative;
    cursor: default;

    &__title {
      margin: 0 0 8px 4px;
      position: absolute;
      transition: opacity .2s;
      visibility: hidden;
      opacity: 0;
    }

    &__list {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      margin: 24px 0 0;
      padding: 0;

      font-size: 12px;
      list-style: none;

      &__item {
        // &:hover {
        //   color: $blue;
        // }
        &--current {
          font-weight: 600;
          color: $blue;
        }
      }
    }
  }
</style>
