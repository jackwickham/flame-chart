export { resizeObserver } from "./resizeObserver";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      resizeObserver: (entry: ResizeObserverEntry) => void;
    }
  }
}