import * as React from 'react';
import { Entry } from '../model';
import AddEntry from './AddEntry';
import { calculateImps } from './Calculation/CalculateImpsScore';
import { calculateScore } from './Calculation/CalculateScore';
import { ScoreTable } from './ScoreTable'
import Grid from '@mui/material/Grid'; // Grid version 1
import { Container } from '@mui/system';


function Bridge() {
    const [entries, setEntries] = React.useState([] as Entry[])
    const [nextId, setNextId] = React.useState(1);
    const [currentEntry, setCurrentEntry] = React.useState({} as Entry);
    const addEntry = (entry: Entry) => {
        entry.score = calculateScore(entry.boardNumber, entry.contractLevel, entry.contractType, entry.tricksMade, entry.by, entry.by === 'N-S', entry.isDoubled, entry.isRedoubled);
        entry.imps = calculateImps(entry.score, entry.points, entry.boardNumber, entry.by);

        let newEntries: Entry[] = [...entries];
        if (!!entry.id) {
            newEntries = newEntries.map(inEntry => inEntry.id === entry.id ? entry : inEntry);
        } else {
            newEntries.push({ ...entry, id: nextId });
            setNextId(nextId + 1);
        }
        setEntries(newEntries);
        setCurrentEntry({} as Entry);
    }

    const deleteEntry = (entryId: number) => {
        const newEntries = entries.filter(entry => entry.id !== entryId);
        setEntries(newEntries);
    }

    const editEntry = (entryId: number) => {
        setCurrentEntry(entries.filter(entry => entry.id = entryId)[0]);
    }

    return (
        <>
            <ScoreTable entries={entries as Entry[]} onDelete={deleteEntry} onEdit={editEntry} />
            <AddEntry entry={currentEntry} addEntryFunction={addEntry} />
        </>
    );
}

export default Bridge;