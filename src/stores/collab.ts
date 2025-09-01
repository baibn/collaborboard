import type { Line } from '@/types'
import { ref } from 'vue'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

const doc = new Y.Doc()
const yLines = doc.getArray<Line>('lines')
const provider = new WebsocketProvider('ws://localhost:1234', 'my-room', doc)

export const collabStore = () => {
  const lines = ref<Line[]>([])
  yLines.observe(() => (lines.value = yLines.toArray()))

  /* 历史栈：Yjs 快照 */
  const history = ref<Line[][]>([])
  const saveState = () => history.value.push(yLines.toArray())

  const addLine = (line: Line) => yLines.push([line])
  const clear = () => yLines.delete(0, yLines.length)

  /* 撤销：从历史栈恢复 Yjs */
  const undo = () => {
    if (history.value.length === 0) return
    history.value.pop()
    const prev = history.value[lines.value.length - 1]
    yLines.delete(0, yLines.length)
    prev.forEach((l) => yLines.push([l]))
  }

  return { lines, addLine, clear, saveState, undo }
}
