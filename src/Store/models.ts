import { action, Action } from "easy-peasy";
import { Entry } from "../model";

export interface StoreModel {
  entries: Entry[];
  selectedEntry: Entry;
  windowSize: WindowSize;
  setEntries: Action<this, Entry[]>;
  setSelectedEntity: Action<this, Entry>;
  setWindowSize: Action<this, WindowSize>;
}

export interface WindowSize {
  height: number;
  width: number;
}

const initialState: StoreModel = {
  entries: [] as Entry[],
  selectedEntry: {} as Entry,
  windowSize: { height: 1024, width: 1024 },
  setEntries: action((state, payload) => {
    state.entries = payload;
  }),
  setSelectedEntity: action((state, payload) => {
    state.selectedEntry = payload;
  }),
  setWindowSize : action((state , payload) => {
    state.windowSize = payload;
  }),
};

export default initialState;
