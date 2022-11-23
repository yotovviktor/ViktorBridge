import * as React from 'react';
import { Entry } from '../model';
import { ScoreTable } from './ScoreTable'
import { calculateBoard } from './Calculation/CalculateBoard';
import AddEntry from './Entry/AddEntry';
import { useStoreActions, useStoreState } from '../Store/Hooks';
import { Box, Container, Grid } from '@mui/material';
import Statistics from './Statistics/Statistics';
import ScrollDialog from './Statistics/ScrollDialog';
import NoEntries from './NoEntries';


function Bridge() {
    const { entries, selectedEntry } = useStoreState((state) => state)
    const { setEntries, setSelectedEntity } = useStoreActions((store) => store)
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
            {entries?.length ? <ScoreTable onDelete={deleteEntry} onEdit={editEntry} /> : <NoEntries/>}
            <Box sx={{ flexGrow: 1 }}>
                <AddEntry addEntryFunction={addEntry} />
                <Container style={{ margin: 'auto' }}>
                    {entries?.length ? <ScrollDialog /> : ''}
                </Container>
            </Box>
        </>
    );
}

export default Bridge;