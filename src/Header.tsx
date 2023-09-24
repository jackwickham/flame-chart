import Icon from "./Icon";
import { useUiState } from "./state/UiState";

const Header = () => {
  const [state, { showSettings, hideSettings }] = useUiState();
  return (
    <header class="p-2 h-12 bg-slate-800 text-white flex flex-row items-center">
      <h1 class="text-xl text-ellipsis overflow-hidden whitespace-nowrap grow shrink">Flame chart viewer</h1>
      <div
          class="grow-0 shrink-0 border-solid border-2 border-transparent hover:border-slate-600 rounded p-1 cursor-pointer"
          classList={{"bg-red-500": state.settingsOpen}}
          onClick={() => state.settingsOpen ? hideSettings() : showSettings()}>
        <Icon icon={state.settingsOpen ? "chevron-right" : "settings"} />
      </div>
    </header>
  );
}

export default Header;