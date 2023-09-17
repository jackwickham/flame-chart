import { For, Show, createSignal, onCleanup } from "solid-js";
import ChartNodes from "./ChartNodes";
import { Node } from "./node";
import Tooltip from "./Tooltip";

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
  const [windowSize, setWindowSize] = createSignal(window.innerWidth);
  const handleResize = () => setWindowSize(window.innerWidth);
  window.addEventListener("resize", handleResize);
  onCleanup(() => window.removeEventListener("resize", handleResize));

  const [hoveredNode, setHoveredNode] = createSignal<Node | null>(null);
  const [mousePos, setMousePos] = createSignal<{x: number, y: number}>({x: 0, y: 0});
  const handleMouseMove = (e: MouseEvent) => setMousePos({x: e.pageX, y: e.pageY});

  const [focusedNode, setFocusedNode] = createSignal<Node>(nodes[0]);
  const offset = () => focusedNode().start.getTime();
  const scalingFactor = () => (focusedNode().end.getTime() - focusedNode().start.getTime()) / windowSize();

  return (<>
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
    <Show when={hoveredNode()}>
      <div class="absolute pointer-events-none" style={{ top: `${mousePos().y}px`, left: `${mousePos().x}px` }}>
        <Tooltip node={hoveredNode()!} />
      </div>
    </Show>
  </>);
};

export default Chart;