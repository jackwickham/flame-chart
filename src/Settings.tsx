import { Show } from "solid-js";
import { type Component } from "solid-js";
import { useUiState } from "./state/UiState";

const Settings: Component = () => {
  const [state, { setRawData, setParsingLogic }] = useUiState();
  return (
    <div
        class="bg-slate-800 text-white grow-0 motion-safe:transition-width overflow-hidden max-h-full"
        classList={{
          "w-96": state.settingsOpen,
          "w-0": !state.settingsOpen,
        }}
        aria-hidden={!state.settingsOpen}>
      <div class="px-4 pt-2 pb-4 w-96 overflow-auto flex flex-col space-y-4 max-h-full">
        <h2 class="text-xl">Settings</h2>
        <div>
          <label class="block" for="settings-raw-data">Raw data</label>
          <textarea
              class="w-full h-36 resize-y bg-slate-700 border-slate-500 border focus-visible:outline-none text-xs"
              autocomplete="off"
              spellcheck={false}
              value={state.rawData || ""}
              onInput={ev => setRawData(ev.target.value)}
              name="settings-raw-data" />
        </div>
        <div>
          <label class="block" for="settings-parsing-logic">Parsing logic</label>
          <textarea
              class="w-full h-36 resize-y bg-slate-700 border-slate-500 border focus-visible:outline-none text-xs"
              autocomplete="off"
              spellcheck={false}
              value={state.parsingLogic || ""}
              onInput={ev => setParsingLogic(ev.target.value)}
              name="settings-parsing-logic" />
        </div>
      </div>
  </div>
  );
}

export default Settings;
