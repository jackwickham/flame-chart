import { type Component } from "solid-js";
import { type Node } from "./node";

export interface TooltipProps {
  node: Node;
}

const Tooltip: Component<TooltipProps> = (props) => {
  return (
    <div class="shadow-sm border rounded p-2 bg-white text-xs">
      <div class="font-bold">{props.node.label}</div>
      <div>Start: {props.node.start.toISOString()}</div>
      <div>End: {props.node.end.toISOString()}</div>
      <div>Duration: {props.node.duration / 1000}s</div>
      <div>Self duration: {(props.node.duration - props.node.children.map(child => child.duration).reduce((l, r) => l + r, 0)) / 1000}s</div>
    </div>
  );
}

export default Tooltip;