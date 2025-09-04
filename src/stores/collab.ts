import type { Line } from '@/types'
import { ref } from 'vue'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

const doc = new Y.Doc()
//历史画线数据
const yLines = doc.getArray<Line>('lines')
const provider = new WebsocketProvider('ws://localhost:1234', 'my-room', doc)

export const collabStore = () => {
  const lines = ref<Line[]>([])
  yLines.observe(() => (lines.value = yLines.toArray()))

  /* 历史栈：Yjs 快照 */
  const history = ref<Line[][]>([])
  const saveState = () => history.value.push(yLines.toArray())

  const addLine = (line: Line) => yLines.push([line])
  const undo = () => {
    if (history.value.length === 0) return
    history.value.pop()
    yLines.delete(0, yLines.length)
    const prev = history.value[lines.value.length - 1] ?? []
    prev.forEach((l) => yLines.push([l]))
  }

  const clearCanvas = () => {
    saveState()
    yLines.delete(0, yLines.length)
  }

  return { lines, addLine, clear: clearCanvas, saveState, undo }
}
