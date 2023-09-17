import { Component, For } from "solid-js";
import type { Node } from "./node";

interface ChartNodesProps {
  nodes: Node[];
  xOffset: number;
  yOffset: number;
  xScalingFactor: number;
  setFocus: (node: Node) => void;
  setNodeHovered: (node: Node) => void;
  unsetNodeHovered: (Node: Node) => void;
}

const ChartNodes: Component<ChartNodesProps> = (props) => {
  return <For each={props.nodes}>{(node) => {
    const x = () => (node.start.getTime() - props.xOffset) / props.xScalingFactor;
    const annotationX = () => Math.max(0, x());
    return <>
      <g class="group" onClick={() => props.setFocus(node)} onMouseEnter={() => props.setNodeHovered(node)} onMouseLeave={() => props.unsetNodeHovered(node)}>
        <rect x={x()} y={props.yOffset} width={node.duration / props.xScalingFactor} height={20} class="fill-red-300" />
        <foreignObject x={annotationX()} y={props.yOffset} width={node.duration / props.xScalingFactor - (annotationX() - x())} height={20}>
          <div class="truncate text-xs align-middle p-0.5">{node.label}</div>
        </foreignObject>
      </g>
      <ChartNodes
          nodes={node.children}
          xOffset={props.xOffset}
          yOffset={props.yOffset + 21}
          xScalingFactor={props.xScalingFactor}
          setFocus={props.setFocus}
          setNodeHovered={props.setNodeHovered}
          unsetNodeHovered={props.unsetNodeHovered} />
    </>
  }}</For>;
};

export default ChartNodes;
