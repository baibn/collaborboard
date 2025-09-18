import type { Sticky } from '@/types'
import { ref } from 'vue'
import * as Y from 'yjs'

const yStickies = new Y.Doc().getArray<Sticky>('stickies')
export const stickyStore = () => {
  const stickies = ref<Sticky[]>([])
  yStickies.observe(() => (stickies.value = yStickies.toArray()))
  const addSticky = (s: Sticky) => yStickies.push([s])
  const updateSticky = (s: Sticky) => {
    const idx = yStickies.toArray().findIndex((i) => i.id === s.id)
    if (idx !== -1) yStickies.delete(idx, 1), yStickies.insert(idx, [s])
  }
  return { stickies, addSticky, updateSticky }
}
