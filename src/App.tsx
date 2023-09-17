import type { Component } from 'solid-js';
import Header from './Header';
import Chart from './chart/Chart';

const App: Component = () => {
  return (
    <div class="flex flex-col justify-items-stretch min-h-screen">
      <div class='grow-0 shrink-0'>
        <Header />
      </div>
      <div class="grow">
        <Chart />
      </div>
    </div>
  );
};

export default App;
