<script setup lang="ts">
import CanvasBoard from '@/components/CanvasBoard.vue'
import ToolBar from '@/components/ToolBar.vue'
import { useCanvas } from '@/composables/useCanvas'
import { onMounted } from 'vue'

const { undo } = useCanvas()

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault()
      undo()
    }
  })
})
</script>

<template>
  <ToolBar />
  <CanvasBoard />
</template>
