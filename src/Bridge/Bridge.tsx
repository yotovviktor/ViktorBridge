import * as React from 'react';
import { Entry } from '../model';
import { ScoreTable } from './ScoreTable'
import { calculateBoard } from './Calculation/CalculateBoard';
import AddEntry from './Entry/AddEntry';
import { useStoreActions, useStoreState } from './Store/Hooks';


function Bridge() {
    const { entries, selectedEntry } = useStoreState((state) => state)
    const { setEntries, setSelectedEntity} = useStoreActions((store) => store)
    const [nextId, setNextId] = React.useState(1);
    const addEntry = (entry: Entry) => {
        entry = calculateBoard(entry);

        let newEntries: Entry[] = Object.assign([], entries);
        if (!!entry.id) {
            newEntries = newEntries.map(inEntry => inEntry.id === entry.id ? entry : inEntry);
        } else {
            newEntries.push({ ...entry, id: nextId });
            setNextId(nextId + 1);
        }
        setEntries(newEntries);
        setSelectedEntity({} as Entry);
    }

    const deleteEntry = (entryId: number) => {
        const newEntries = entries.filter(entry => entry.id !== entryId);
        setEntries(newEntries);
    }

    const editEntry = (entryId: number) => {
        setSelectedEntity(entries.filter(entry => entry.id = entryId)[0]);
    }

    return (
        <>
            <ScoreTable onDelete={deleteEntry} onEdit={editEntry} />
            <AddEntry addEntryFunction={addEntry} />
        </>
    );
}

export default Bridge;