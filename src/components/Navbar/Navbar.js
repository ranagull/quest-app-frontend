import React from "react";
import {Link} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { withTheme } from "styled-components";

function Navbar(){
    let userId = 5;

    return(
        <div>

        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ textAlign: "left", flexGrow: 1 }}>
                <Link style={{
                    textDecoration: "none",
                    boxShadow: "none",
                    color: "white"
                }}
                 to="/">Home</Link>
            </Typography>
            <Typography variant="h6" >
            <Link style={{
                    textDecoration: "none",
                    boxShadow: "none",
                    color: "white"
                }}
                 to={{pathname: '/users/' + userId}}>User</Link>
            </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default Navbar;