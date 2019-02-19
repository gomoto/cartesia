import { CartesianLine } from "../state";

export function computeLineLength(line: CartesianLine): number {
  const x = line.end.x - line.start.x;
  const y = line.end.y - line.start.y;
  const z = line.end.z - line.start.z;
  return (x**2 + y**2 + z**2)**0.5;
}
