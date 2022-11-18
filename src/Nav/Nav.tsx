import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import logo from '../logo.png'
import { purpuleColor } from "../styles";

export default function ButtonAppBar() {
    return (
        <Box >
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