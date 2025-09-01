declare module 'y-websocket' {
  import * as Y from 'yjs'
  export class WebsocketProvider {
    constructor(url: string, room: string, doc: Y.Doc)
    destroy(): void
  }
}
