<template>
  <div class="star-rating">
    <button
      v-for="n in max"
      :key="n"
      :class="['star', { filled: n <= internalValue }]"
      @click="set(n)
      "
      type="button"
      aria-label="Rate"
    >
      ★
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  max: { type: Number, default: 5 }
});
const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue || 0);

watch(
  () => props.modelValue,
  (v) => {
    internalValue.value = v || 0;
  }
);

function set(n) {
  internalValue.value = n;
  emit('update:modelValue', n);
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 0.25rem;
}
.star {
  background: transparent;
  border: none;
  font-size: 1.4rem;
  color: #ccc;
  cursor: pointer;
  padding: 0;
}
.star.filled {
  color: #FFD700;
}
.star:focus {
  outline: none;
}
</style>
