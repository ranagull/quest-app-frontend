import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { Gradient } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: expand ? 'scaleY(1)' : 'scaleY(1)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function PostForm(props){
   const {userId, userName, refreshPosts} = props;
   const [text, setText] = React.useState("");
   const [title, setTitle] = React.useState("");
   const [isSent, setIsSent] = React.useState(false);

   // post create fonksiyonu PostCreateRequest objesi aldığı için bu objenin içerdiği fieldlara bakıyoruz.
   const savePost = () => {
    fetch("/posts",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            userId: userId,
            text: text,
        }),
    })
    .then((res) => res.json())
    .catch((err) => console.log("error"))
   }
   // backend'e gönderirken objeye dönüştürüp göndericez
   const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
   };

   // hala yazıyorum
   const handleTitle = (value) => {
    setIsSent(false);
    setTitle(value);
   };

   // hala yazıyorum
   const handleText = (value) => {
    setIsSent(false);
    setText(value);
   };

   // uyarı yazısı için
   const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

   const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
    };

   return(
    <div>
        <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your post is sent!
        </Alert>
       </Snackbar>

        <div className="postContainer">
        <Card sx={{ width: 800,
        textAlign: "left",
        margin: 2}}>
        <CardHeader
            avatar={
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
            

            }
            title={<OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder="Title"
            inputProps={{MaxLenght: 25}}
            fullWidth
            value = {title}
            onChange = {(i) => handleTitle(i.target.value)}
            >
            
            </OutlinedInput>}
        />
        
        <CardContent>
            <Typography variant="body2" color="text.secondary">
            <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder="Text"
            inputProps={{MaxLenght: 250}}
            fullWidth
            value = {text}
            onChange = {(i) => handleText(i.target.value)}
            endAdornment = {
                <InputAdornment position ="end">
                <Button
                variant = "contained"
                style = {{background: 'linear-Gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white'}}
                onClick={handleSubmit}
                >POST</Button>
                </InputAdornment>
            }>
            </OutlinedInput>
            </Typography>
        </CardContent>
        </Card>
        </div>

    </div>
   )
}

export default PostForm;