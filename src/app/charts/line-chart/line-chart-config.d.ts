export interface LineChartConfig { 
  settings: { fill: string, interpolation: string };
  dataset: Array<{ x: string, y: number }>
}