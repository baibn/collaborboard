<script setup lang="ts">
import { useCanvas } from '@/composables/useCanvas'
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()
const { initCtx, start, move, stop, tool } = useCanvas()

onMounted(() => {
  if (canvasRef.value) {
    initCtx(canvasRef.value)
  }
})
</script>

<template>
  <div class="canvas-container">
    <canvas
      id="board"
      ref="canvasRef"
      width="800"
      height="600"
      @mousedown="start"
      @mousemove="move"
      @mouseup="stop"
      @mouseleave="stop"
      :class="{ 'eraser-cursor': tool === 'eraser' }"
      class="drawing-canvas"
    />
  </div>
</template>

<style scoped>
.canvas-container {
  display: flex;
  justify-content: center;
  padding: 16px;
}

.drawing-canvas {
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: crosshair;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease;
}

.drawing-canvas:hover {
  border-color: #42b883;
}

.drawing-canvas.eraser-cursor {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="8" width="16" height="8" rx="2" fill="%23ff4757"/><rect x="6" y="4" width="8" height="4" rx="1" fill="%23ffa502"/></svg>')
      10 10,
    auto;
}
</style>
