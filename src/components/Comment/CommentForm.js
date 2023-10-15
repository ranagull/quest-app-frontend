import React from "react";
import { Button, CardContent, InputAdornment, OutlinedInput, makeStyles } from "@mui/material";

import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';


function CommentForm(props) {
    const {userId, userName, postId} = props;
    const [text, setText] = React.useState("");

    const handleSubmit = () => {
        saveComment();
        setText("");
    };

    const handleChange = (value) => {
        setText(value);
    };
    
    
    const saveComment = () => {
        fetch("/comments",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error"))
       }

    return(
        <CardContent sx={{ width: 800,
            textAlign: "left",
            margin: 2}}>
            
            <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            inputProps={{MaxLenght: 250}}
            fullWidth
            onChange = {(i) => handleChange(i.target.value)}
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
            endAdornment = {
                <InputAdornment position = "end">
                    <Button
                    variant = "contained"
                    style = {{background: 'linear-Gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white'}}
                    onClick={handleSubmit}>Comment</Button>
                </InputAdornment>
            }
            value = {text}
            style = {{ color: "black", backgroundcolor: 'white'}}
            >
            </OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;