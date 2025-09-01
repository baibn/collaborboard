import { WebSocketServer } from 'ws'

const PORT = 1234
const wss = new WebSocketServer({ port: PORT })
const clients = new Set() // 不使用 TypeScript 泛型

console.log(`Minimal WebSocket server running on ws://localhost:${PORT}`)

wss.on('connection', (ws, req) => {
  const clientId = `${req.socket.remoteAddress}:${req.socket.remotePort}`
  clients.add(ws)
  console.log(
    `[CONNECT] Client connected: ${clientId} | Total clients: ${clients.size}`
  )

  ws.on('message', (msg) => {
    const isBinary = Buffer.isBuffer(msg)
    const len = msg.length
    const display = isBinary
      ? `<binary ${len} bytes> 0x${msg.slice(0, 16).toString('hex')}`
      : msg.toString().slice(0, 100)

    console.log(
      `[MESSAGE] From ${clientId} (${
        isBinary ? 'binary' : 'text'
      }) ${len} bytes: ${display}`
    )
  })

  ws.on('close', () => {
    clients.delete(ws)
    console.log(
      `[DISCONNECT] Client disconnected: ${clientId} | Total clients: ${clients.size}`
    )
  })

  ws.on('error', (err) => {
    console.error(`[ERROR] Client ${clientId}:`, err)
  })
})
