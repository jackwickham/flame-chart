import { createSignal, onCleanup } from "solid-js";
import ChartNodes from "./ChartNodes";
import { type Node } from "./node";
import Tooltip from "./Tooltip";
import { resizeObserver } from "../directives";

interface Event {
  label: string;
  end: Date;
  duration: number;
}

const events: Event[] = [
  { label: "left_child", end: new Date("2023-01-01T23:00:30"), duration: 20 },
  { label: "grandchild", end: new Date("2023-01-01T23:00:54"), duration: 5 },
  { label: "right_child", end: new Date("2023-01-01T23:00:55"), duration: 15 },
  { label: "root", end: new Date("2023-01-01T23:01:00"), duration: 60 },
];

const processData = (events: Event[]) => {
  const nodes: Node[] = [];
  for (let i = events.length - 1; i >= 0; i--) {
    const event = events[i];
    const node: Node = {
      label: event.label,
      start: new Date(event.end.getTime() - event.duration * 1000),
      end: event.end,
      duration: event.duration * 1000,
      children: [],
    };
    
    // Find the parent, and insert this as a child
    let current = nodes;
    while (current.length > 0) {
      const last = current[current.length - 1];
      if (last.start > node.end) {
        break;
      }
      current = last.children;
    }
    current.push(node);
  }
  return nodes.reverse();
};
const nodes = processData(events);

const Chart = () => {
  const [windowWidth, setWindowWidth] = createSignal(window.innerWidth);

  const [hoveredNode, setHoveredNode] = createSignal<Node | null>(null);
  const [mousePos, setMousePos] = createSignal<{x: number, y: number}>({x: 0, y: 0});
  const handleMouseMove = (e: MouseEvent) => setMousePos({x: e.pageX, y: e.pageY});

  const [focusedNode, setFocusedNode] = createSignal<Node>(nodes[0]);
  const offset = () => focusedNode().start.getTime();
  const scalingFactor = () => (focusedNode().end.getTime() - focusedNode().start.getTime()) / windowWidth();

  const tooltip = () => {
    const node = hoveredNode();
    if (!node) {
      return null;
    }

    const [tooltipWidth, setTooltipWidth] = createSignal(0);
    const left = () => {
      if (mousePos().x + tooltipWidth() > windowWidth()) {
        return Math.max(windowWidth() - tooltipWidth(), 0);
      }
      return mousePos().x;
    }
    return (
      <div class="absolute pointer-events-none max-w-xs" style={{ top: `${mousePos().y}px`, left: `${left()}px` }} use:resizeObserver={(entry) => setTooltipWidth(entry.contentRect.width)}>
        <Tooltip node={node} />
      </div>
    );
  };

  return (
    <div use:resizeObserver={(entry) => setWindowWidth(entry.contentRect.width)}>
      <div class="overflow-x-hidden">
        <svg class="w-full min-h-full" onMouseMove={handleMouseMove}>
          <ChartNodes
              nodes={nodes}
              xOffset={offset()}
              yOffset={0}
              xScalingFactor={scalingFactor()}
              setFocus={setFocusedNode}
              setNodeHovered={setHoveredNode}
              unsetNodeHovered={(node) => node === hoveredNode() && setHoveredNode(null)} />
        </svg>
        {tooltip()}
      </div>
    </div>
  );
};

export default Chart;