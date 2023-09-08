<template>
  <CommonInput 
    inputId="league-name-input__input"
    label="League name"
    placeholder="Specify league name"
    :value="value"
    @on-input="newValue => emit('onValueChange', newValue)"
    :helper="inputHelper"
  />
</template>

<script setup lang="ts">
  const props = defineProps<{ value: string }>()
  const emit = defineEmits<{ (e: 'onValueChange', newValue: string): void }>()

  const inputHelper = computed(() => {
    if (props.value.length > 2)
      return 'more chars = better results'
    else 
      return !props.value.length
        ? 'type at least 3 chars'
        : props.value.length < 3
          ? `type ${3 - props.value.length} more ` + 
            `char${props.value.length > 1 ? '' : 's'}`
          : ''
  })
</script>
