<script setup lang="ts">
import CanvasBoard from '@/components/CanvasBoard.vue'
import ToolBar from '@/components/ToolBar.vue'
import { useAuth } from '@/stores/auth'
import { collabStore } from '@/stores/collab'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { user } = useAuth()

onMounted(() => {
  const { lines, addLine } = collabStore()
  addLine({ points: [], color: '#000', width: 3, tool: 'pen' }) // 初始化房间
})

console.log(user.value)

const room = route.params.room as string
</script>

<template>
  <h1>Room: {{ room }} | 用户: {{ user?.email }}</h1>
  <ToolBar></ToolBar>
  <CanvasBoard />
</template>
