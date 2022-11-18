import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import logo from '../logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import { purpuleColor } from "../styles";

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: purpuleColor }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bridge
                    </Typography>
                    <Avatar alt="Maze" src={logo} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}