import { onCleanup } from "solid-js";

export const resizeObserver = (element: HTMLElement, accessor: () => (entry: ResizeObserverEntry) => void) => {
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      accessor()(entry);
    }
  });
  resizeObserver.observe(element);
  onCleanup(() => resizeObserver.disconnect());
}
