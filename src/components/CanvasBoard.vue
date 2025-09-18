<script setup lang="ts">
import { useCanvas } from '@/composables/useCanvas'
import { useDrag } from '@/composables/useDrag'
import { stickyStore } from '@/stores/sticky'
import type { Sticky } from '@/types'
import { onMounted, onUnmounted, ref } from 'vue'
import StickyNote from './StickyNote.vue'

const canvasRef = ref<HTMLCanvasElement>()
const { initCtx, start, move, stop, tool } = useCanvas()
const { onMouseDown, onMouseMove, onMouseUp } = useDrag()
const { stickies, addSticky, updateSticky } = stickyStore()

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  initCtx(el)

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  // 组件卸载时顺手把监听清掉，防止内存泄漏
  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  })
})

/* 双击空白处新建便签 */
const onDblClick = (e: MouseEvent) => {
  addSticky({
    id: crypto.randomUUID(),
    x: e.offsetX,
    y: e.offsetY,
    text: '新便签',
    color: '#ffeb3b',
  })
}
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
      @dblclick="onDblClick"
      :class="{ 'eraser-cursor': tool === 'eraser' }"
      class="drawing-canvas"
    />
  </div>
  <div>
    <StickyNote
      v-for="s in stickies"
      :key="s.id"
      :sticky="s"
      @mousedown="(e: MouseEvent) => onMouseDown(e, s)"
      @update="(s: Sticky) => updateSticky(s)"
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
