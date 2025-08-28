export interface Point {
  x: number
  y: number
}
export type Tool = 'pen' | 'eraser'
export interface Line {
  points: Point[]
  color: string
  width: number
  tool: Tool
}
