
export interface Node {
  label: string;
  start: Date;
  end: Date;
  duration: number;
  children: Node[];
}