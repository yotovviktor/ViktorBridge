import { action, Action } from "easy-peasy";
import { Entry } from "../../model";

export interface StoreModel {
    entries: Entry[]
    selectedEntry: Entry
    setEntries: Action<this, Entry[]>
    setSelectedEntity: Action<this, Entry>

}

const initialState: StoreModel = {
    entries: [] as Entry[],
    selectedEntry: {} as Entry,
    setEntries: action((state, payload) => {
        state.entries = payload
    }),
    setSelectedEntity : action((state, payload) => {
        state.selectedEntry = payload;
    })

}

export default initialState;