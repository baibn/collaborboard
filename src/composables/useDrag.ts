import { ref } from 'vue'
import type { Sticky } from '../types'

export function useDrag() {
  const target = ref<Sticky | null>(null)
  const offset = ref({ x: 0, y: 0 })

  const onMouseDown = (e: MouseEvent, sticky: Sticky) => {
    target.value = sticky
    offset.value = { x: e.offsetX, y: e.offsetY }
  }
  const onMouseMove = (e: MouseEvent) => {
    if (!target.value) return
    target.value.x += e.movementX
    target.value.y = e.movementY
  }

  const onMouseUp = () => (target.value = null)

  return { onMouseDown, onMouseMove, onMouseUp }
}
