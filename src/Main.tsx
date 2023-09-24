import type { Component } from 'solid-js';
import Header from './Header';
import Chart from './chart/Chart';
import Settings from './Settings';

const Main: Component = () => {
  return (
    <div class="flex flex-col justify-items-stretch h-screen">
      <div class='grow-0 shrink-0'>
        <Header />
      </div>
      <div class="grow flex flex-row min-h-0">
        <div class="grow">
          <Chart />
        </div>
        <Settings />
      </div>
    </div>
  );
};

export default Main;