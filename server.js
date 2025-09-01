import WebSocket, { WebSocketServer } from 'ws'

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
    const displayMsg = msg.toString().slice(0, 100) // 只显示前100字符
    console.log(`[MESSAGE] From ${clientId}: ${displayMsg}`)

    // 广播给其他客户端
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg)
      }
    }
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
