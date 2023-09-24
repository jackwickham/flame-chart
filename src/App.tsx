import type { Component } from 'solid-js';
import { UiStateProvider } from './state/UiState';
import Main from './Main';

const App: Component = () => {
  return (
    <UiStateProvider>
      <Main />
    </UiStateProvider>
  );
};

export default App;
