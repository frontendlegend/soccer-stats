<template>
  <div class="default-layout">
    <header class="default-layout__header">
      <div class="global-container">
        <div class="default-layout__header__radio">
          <!-- <div class="default-layout__header__radio__item">
            <input type="radio" id="leagues" value="Leagues" v-model="radio" />
            <label for="leagues">Leagues</label>
          </div>
          <div class="default-layout__header__radio__item">
            <input type="radio" id="teams" value="Teams" v-model="radio" />
            <label for="teams" v-text="'Teams'" />
          </div> -->
        </div>

        <NuxtLink class="default-layout__header__link" to="/">
          <h5
            class="default-layout__header__title"
            v-text="'Thesis Soccer Stats'"
          />
        </NuxtLink>
      </div>
    </header>

    <main class="default-layout__main">
      <div class="global-container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  // const route = useRoute()
  // const radio = ref<string>(route.query.radio as string ?? 'Leagues')
  // const router = useRouter()
  // watch(radio, () => {
  //   router.push({ query: { radio: radio.value } })
  // }, { immediate: true })
</script>

<style scoped lang="scss">
  @include global-container;

  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__header {
      display: flex;
      align-items: center;
      height: 50px;

      @include global-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &__link {
        color: $blue;
        text-decoration: none;

        &:visited {
          color: $blue;
        }
      }
      &__title {
        margin: 0;
      }

      &__radio {
        display: flex;
        align-items: center;
        gap: 16px;

        & * {
          cursor: pointer;
        }

        &__item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    &__main {
      padding: 15px 0;
    }
  }
</style>
