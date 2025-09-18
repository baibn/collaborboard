<script setup lang="ts">
import type { Sticky } from '@/types'
import { ref } from 'vue'

const props = defineProps<{ sticky: Sticky }>()
const emit = defineEmits<{ update: [s: Sticky] }>()

const isEditing = ref(false)
const draft = ref(props.sticky.text)

const onEdit = () => {
  isEditing.value = true
  draft.value = props.sticky.text
}

const onSave = () => {
  isEditing.value = false
  emit('update', { ...props.sticky, text: draft.value })
}
</script>

<template>
  <div
    class="sticky"
    :style="{
      left: sticky.x + 'px',
      top: sticky.y + 'px',
      background: sticky.color,
    }"
    @dblckick="onEdit"
  >
    <textarea v-if="isEditing" v-model="draft" @blur="onSave" />
    <div v-else>{{ sticky.text }}</div>
  </div>
</template>
<style scoped>
.sticky {
  position: absolute;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: move;
  min-width: 120px;
  min-height: 80px;
}
textarea {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  background: transparent;
}
</style>
