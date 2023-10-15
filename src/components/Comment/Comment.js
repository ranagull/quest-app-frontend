import React from "react";
import { CardContent, InputAdornment, OutlinedInput, makeStyles } from "@mui/material";

import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';


function Comment(props) {
    const {text, userId, userName} = props;

    return(
        <CardContent sx={{ width: 800,
            textAlign: "left",
            margin: 2}}>

            <OutlinedInput
            disabled
            id="outlined-adornment-amount"
            multiline
            inputProps={{MaxLenght: 25}}
            fullWidth
            value = {text}
            startAdornment = {
                <InputAdornment position="start">
                    <Link style={{
                    textDecoration: "none",
                    boxShadow: "none",
                    color: "white"
                    }}
                    to={{pathname: '/users/' + userId}}>

                        <Avatar sx={{ background: 'linear-Gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white' }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()} 
                        </Avatar>

                    </Link>
                </InputAdornment>
            }
            style = {{ color: "black", backgroundcolor: 'white'}}
            >
            </OutlinedInput>
        </CardContent>
    )
}

export default Comment;