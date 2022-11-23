import { Typography } from '@mui/material';
import GridOffIcon from '@mui/icons-material/GridOff';
import React from 'react';

const NoEntries = () => {
    return (
        <div style={{
            width: '100%', textAlign: 'center'
        }}>
            <GridOffIcon  sx={{
                fontSize:'80px',
                margin: '0',
                opacity: '0.7',
                marginTop: '20px',
            }} />
            <Typography sx={{ marginTop: '10px', marginBottom: '25px' }}>
                <i style={{
                    margin: '0',
                    opacity: '0.7'
                }}>
                    No entries yet. Add entry to start tracking.
                </i>
            </Typography>
        </div >
    );
}

export default NoEntries;