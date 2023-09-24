import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export interface UiState {
  settingsOpen: boolean;
  rawData: string | null;
  parsingLogic: string | null;
  parsedData: string | null;
}

export interface UiStateActions {
  showSettings: () => void;
  hideSettings: () => void;
  setRawData: (data: string) => void;
  setParsingLogic: (data: string) => void;
  setParsedData: (data: string) => void;
}

const UiStateContext = createContext<[UiState, UiStateActions]>();

export function UiStateProvider(props: any) {
  const [store, setStore] = createStore<UiState>({ settingsOpen: false, rawData: null, parsingLogic: null, parsedData: null });
  const actions: UiStateActions = {
    showSettings: () => {
      setStore("settingsOpen", true);
    },
    hideSettings: () => {
      setStore("settingsOpen", false);
    },
    setRawData: (data: string) => {
      setStore("rawData", data);
    },
    setParsingLogic: (data: string) => {
      setStore("parsingLogic", data);
    },
    setParsedData: (data: string) => {
      setStore("parsedData", data);
    },
  };

  return (
    <UiStateContext.Provider value={[store, actions]}>
      {props.children}
    </UiStateContext.Provider>
  );
}

export function useUiState() {
  const context = useContext(UiStateContext);
  if (!context) {
    throw new Error("UiStateContext not found");
  }
  return context;
}
