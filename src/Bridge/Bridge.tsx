import * as React from 'react';
import { Entry } from '../model';
import AddEntry from './AddEntry';
import { calculateImps } from './CalculateImpsScore';
import { calculateScore } from './CalculateScore';
import { ScoreTable } from './ScoreTable'
import  './Bridge.css'
import Grid from '@mui/material/Grid'; // Grid version 1


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
        <Grid container spacing={1} columns={16}>
            <Grid item xs={10}>
                <ScoreTable entries={entries as Entry[]} onDelete={deleteEntry} onEdit={editEntry} />
            </Grid>
            <Grid item xs={5} sx={{ marginRight: '5px', marginTop:"20px" }}>
                <AddEntry entry={currentEntry} addEntryFunction={addEntry} />
            </Grid>
        </Grid>
    );
}

export default Bridge;