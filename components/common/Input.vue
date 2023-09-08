<template>
  <div class="input-wrapper" :id="props.wrapperId">
    <label 
      v-if="inputId && label"
      class="input-wrapper__label"
      :for="props.inputId" 
      v-text="props.label" 
    />
    <input 
      class="input-wrapper__input"
      :id="props.inputId"
      :placeholder="props.placeholder" 
      :value="props.value"
      @input="e => emit('onInput', (e.target as HTMLInputElement).value)"
    />
    <p 
      v-if="props.helper"
      class="input-wrapper__helper" 
      v-text="props.helper" 
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ 
    wrapperId?: string 
    inputId?: string 
    label?: string
    placeholder?: string
    value: string
    helper?: string
  }>()

  const emit = defineEmits<{ 
    (e: 'onInput', newValue: string): void
  }>()
</script>

<style scoped lang="scss">
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__label {
      font-size: 12px;
    }

    &__input {
      padding: 8px;
    }

    &__helper {
      margin: 0;
      font-size: 11px;
    }
  }
</style>
