import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import logo from '../logo.png'
import { purpuleColor } from "../styles";

export default function ButtonAppBar() {
    return (
        <Box sx={{ display: "flex" }} >
            <AppBar position="fixed" sx={{ bgcolor: purpuleColor, width: `100%`, }}>
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