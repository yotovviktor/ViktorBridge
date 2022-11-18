import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, Card, CardActions, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import { AddOrEditEntryProps, By, ContractType, Entry } from "../model";

export const validationSchema = yup.object().shape({
    boardNumber: yup.number().integer().required()
        .min(1, 'Board number must be positive'),
    contractLevel: yup.number().integer().required()
        .min(1, 'contractLevel should be between 1 and 7')
        .max(7, 'contractLevel should be between 1 and 7'),
    contractType: yup.string().required(),
    by: yup.string().required(),
    isDoubled: yup.boolean(),
    isRedoubled: yup.boolean(),
    points: yup.number().integer('Must be a number').required()
        .min(0, 'Points must be between 0 and 40')
        .max(40, 'Points must be between 0 and 40'),
    tricksMade: yup.number().integer().required()
        .min(0, 'Tricks must be between 0 and 13')
        .max(13, 'tricks must be between 0 and 13'),
});

const AddEntry: React.FC<AddOrEditEntryProps> = ({ entry, addEntryFunction }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [by, setBy] = useState(entry.by || '')
    const [type, setType] = useState(entry.contractType || '');
    const [isDoubled, setIsDoubled] = useState(false);
    const [isRedoubled, setIsRedoubled] = useState(false);
    const [level, setLevel] = useState(0)
    const [tricksMade, setTricksMade] = useState(0);
    const handleChangeBy = (event: SelectChangeEvent<string>) => {
        setBy(event.target.value as By);
    }

    const handleChangeTricksMade = (event: SelectChangeEvent<string>) => {
        setTricksMade(+event.target.value);
    }

    const handleChangeContractType = (event: SelectChangeEvent<string>) => {
        setType(event.target.value as ContractType)
    }

    const handleChangelevel = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLevel(+event.target.value);
    }

    const handleChangeisRedoubled = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRedoubled(prevState => !prevState);
        setIsDoubled(prevState => false);
    }

    const handleChangeisDoubled = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDoubled(prevState => !prevState);
        setIsRedoubled(prevState => false);
    }

    const onSubmitHandler = (data: any) => {
        const dataAsEntry = data as Entry;
        dataAsEntry.isDoubled = isDoubled;
        dataAsEntry.isRedoubled = isRedoubled;
        addEntryFunction(dataAsEntry);
        customReset();
    };

    const customReset = () => {
        reset();
        setBy('');
        setType('');
        setTricksMade(0);
        setIsDoubled(prevState => false);
        setIsRedoubled(prevState => false);
    }

    return (
        <div style={{ alignContent: 'center', width: 'max' }}>
            <Card sx={{ bgcolor: 'rgb(236, 243, 245)', padding: '10px', maxWidth: '500px', position: 'center', border: 'thin' }}>
                <CardHeader
                    sx={{ borderBottom: 'thick' , borderBottomColor: 'grey'}}
                    avatar={
                        <Avatar sx={{ bgcolor: 'blue' }} aria-label="recipe">
                            <AddIcon />
                        </Avatar>
                    }
                    title="Add Entry"
                />
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div>
                        <FormControl>
                            <TextField
                                sx={{ m: 1, minWidth: '5ch', maxWidth: '10ch' }}
                                error={!!errors['boardNumber']}
                                type="number" defaultValue={entry.boardNumber || ''}
                                {...register('boardNumber')}
                                id="contract-number-input"
                                label="Board#"
                                variant="filled"
                                helperText={!!errors['boardNumber'] ? errors['boardNumber'].message as string : ''}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                sx={{ m: 1, minWidth: '5ch', maxWidth: '10ch' }}
                                error={!!errors['contractLevel']}
                                type="number" defaultValue={entry.contractLevel || ''}
                                {...register('contractLevel', { onChange: (e) => handleChangelevel(e) })}
                                label="Level"
                                variant="filled"
                                helperText={!!errors['contractLevel'] ? errors['contractLevel'].message as string : ''}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="contract-contractLevel-input" />
                        </FormControl>
                        <TextField
                            sx={{ m: 1, minWidth: '20ch', maxWidth: '22ch' }}
                            id="filled-select-currency"
                            select
                            error={!!errors['contractType']}
                            label="Contract Type"
                            value={type || ''}
                            {...register('contractType', { onChange: (e) => handleChangeContractType(e) })}
                            helperText={!!errors['contractType'] ? errors['contractType'].message as string : ''}
                            variant="filled"
                        >
                            <MenuItem value={'Clubs'}>Clubs</MenuItem>
                            <MenuItem value={'Diamonds'}>Diamonds</MenuItem>
                            <MenuItem value={'Hearts'}>Hearts</MenuItem>
                            <MenuItem value={'Spades'}>Spades</MenuItem>
                            <MenuItem value={'NoTrump'}>NoTrump</MenuItem>
                        </TextField>
                    </div>
                    <div style={{ display: 'flex', verticalAlign: 'center' }}>
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox
                                    sx={{ m: 1 }}
                                    {...register('isDoubled', { onChange: (e) => handleChangeisDoubled(e) })}
                                    checked={isDoubled}
                                    defaultValue={String(isRedoubled)}
                                    disabled={isRedoubled}
                                    value={Boolean(isRedoubled)} />}
                                label="X" />
                            <FormControlLabel control={
                                <Checkbox  {...register('isRedoubled', { onChange: (e) => handleChangeisRedoubled(e) })}
                                    sx={{ m: 1 }}
                                    disabled={Boolean(isDoubled)}
                                    checked={Boolean(isRedoubled)}
                                    value={Boolean(isRedoubled)} />
                            } label="XX" />

                            <TextField
                                sx={{ m: 1, minWidth: '10ch', maxWidth: '15ch' }}
                                id="filled-select"
                                select
                                error={!!errors['by']}
                                label="By"
                                value={by}
                                {...register('by', { onChange: (e) => handleChangeBy(e) })}
                                helperText={!!errors['by'] ? errors['by'].message as string : ''}
                                variant="filled"
                            >
                                <MenuItem value={'N-S'}>N-S</MenuItem>
                                <MenuItem value={'E-W'}>E-W</MenuItem>
                            </TextField>
                            <TextField
                                sx={{ m: 1, minWidth: '10ch', maxWidth: '12ch' }}
                                id="ticks-made-select-input"
                                select
                                error={!!errors['tricksMade']}
                                label="Tricks"
                                value={tricksMade || ''}
                                {...register('tricksMade', { onChange: (e) => handleChangeTricksMade(e) })}
                                helperText={!!errors['tricksMade'] ? errors['tricksMade'].message as string : ''}
                                variant="filled"
                            >
                                {
                                    Array.from(Array(14).keys()).map(el => {
                                        return (
                                            <MenuItem key={el}
                                                autoFocus={el === (level + 6)}
                                                value={el}>
                                                {
                                                    (el === level + 6)
                                                        ? '='
                                                        : (el < (level + 6)) ? 0 - (level + 6 - el) : el - (level + 6)
                                                }
                                            </MenuItem>)
                                    })
                                }
                            </TextField>
                            <FormControl>
                                <TextField
                                    sx={{ m: 1, minWidth: '5ch', maxWidth: '10ch' }}
                                    error={!!errors['points']}
                                    type="number" defaultValue={entry.boardNumber || ''}
                                    {...register('points')}
                                    id="points-input"
                                    label="Points"
                                    variant="filled"
                                    helperText={!!errors['points'] ? errors['points'].message as string : ''}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </FormGroup>
                    </div>
                    <CardActions>
                        <Button
                            type='submit'
                            size="large"
                            color="primary"
                        >
                            Add
                        </Button>

                        <Button
                            type='button'
                            size="large"
                            color="warning"
                            onClick={() => customReset()}
                        >
                            Reset
                        </Button>
                    </CardActions>
                </form >
            </Card>
        </div>
    );
}

export default AddEntry;

