import type { Line } from '@/types'
import { ref } from 'vue'

// 全局状态 - 单例模式
const isDrawing = ref(false)
const color = ref('#000000')
const width = ref(3)
const tool = ref<'pen' | 'eraser'>('pen')
const lines = ref<Line[]>([])
/* 历史栈 */
const history = ref<Line[][]>([])
const saveState = () =>
  history.value.push(JSON.parse(JSON.stringify(lines.value)))

let ctx!: CanvasRenderingContext2D

export function useCanvas() {
  const initCtx = (canvas: HTMLCanvasElement) => {
    ctx = canvas.getContext('2d')!
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  /* 实时重画（包含橡皮擦） */
  const redraw = () => {
    if (!ctx) return

    // 清空画布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // 重绘所有线条
    lines.value.forEach((line) => {
      if (line.points.length === 0) return

      // 设置绘制模式
      ctx.globalCompositeOperation =
        line.tool === 'eraser' ? 'destination-out' : 'source-over'
      ctx.strokeStyle = line.tool === 'eraser' ? 'rgba(0,0,0,1)' : line.color
      ctx.lineWidth = line.width
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // 绘制路径
      ctx.beginPath()
      line.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.stroke()
    })

    // 重置为默认绘制模式
    ctx.globalCompositeOperation = 'source-over'
  }

  const start = (e: MouseEvent) => {
    saveState()
    isDrawing.value = true
    lines.value.push({
      points: [{ x: e.offsetX, y: e.offsetY }],
      color: color.value,
      width: width.value,
      tool: tool.value,
    })
    // 立即绘制起始点
    redraw()
  }

  const move = (e: MouseEvent) => {
    if (!isDrawing.value) return
    const cur = lines.value[lines.value.length - 1]
    if (cur) {
      cur.points.push({ x: e.offsetX, y: e.offsetY })
      redraw() // 实时重画
    }
  }

  const stop = () => {
    isDrawing.value = false
  }

  const clear = () => {
    lines.value = []
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      // 重置绘制状态
      ctx.globalCompositeOperation = 'source-over'
    }
  }
  const undo = () => {
    if (history.value.length === 0) return
    history.value.pop()
    lines.value = history.value.length
      ? history.value[history.value.length - 1]
      : []
    redraw()
  }

  return {
    initCtx,
    color,
    width,
    tool,
    start,
    move,
    stop,
    undo,
    clear,
    isDrawing,
    lines,
  }
}
