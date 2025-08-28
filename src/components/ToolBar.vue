<script setup lang="ts">
import { useCanvas } from '@/composables/useCanvas'
import { onMounted } from 'vue'
const { color, width, tool, clear, undo } = useCanvas()
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
  <div class="toolbar">
    <div class="tool-group">
      <button
        :class="{ active: tool === 'pen' }"
        @click="tool = 'pen'"
        class="tool-btn"
      >
        ✏️ 画笔
      </button>
      <button
        :class="{ active: tool === 'eraser' }"
        @click="tool = 'eraser'"
        class="tool-btn"
      >
        🧽 橡皮
      </button>
    </div>

    <div class="control-group">
      <label>颜色:</label>
      <input type="color" v-model="color" :disabled="tool === 'eraser'" />
    </div>

    <div class="control-group">
      <label>粗细:</label>
      <input
        type="range"
        min="1"
        max="20"
        v-model.number="width"
        class="width-slider"
      />
      <span class="width-display">{{ width }}px</span>
    </div>
    <button @click="undo">撤销 Ctrl+Z</button>
    <button @click="clear" class="clear-btn">🗑️ 清空</button>
  </div>
</template>
<style scoped>
.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tool-group {
  display: flex;
  gap: 4px;
}

.tool-btn {
  padding: 8px 12px;
  border: 2px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.tool-btn:hover {
  border-color: #42b883;
}

.tool-btn.active {
  background: #42b883;
  color: #fff;
  border-color: #42b883;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.width-slider {
  width: 100px;
}

.width-display {
  font-size: 12px;
  color: #666;
  min-width: 30px;
}

.clear-btn {
  padding: 8px 12px;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
}

.clear-btn:hover {
  background: #ff3742;
}

input[type='color'] {
  width: 40px;
  height: 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type='color']:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
