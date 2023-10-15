import React, {useState, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

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
import { Container } from "@mui/material";

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

function Post(props){
   const {title, text, userId, userName, postId} = props;
   const [expanded, setExpanded] = React.useState(false);
   const [liked, setLiked] = React.useState(false);

   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);

   const [commentList, setCommentList] = useState([]);
   const isInitialMount = useRef(true);

   const handleExpandClick = () => {
     setExpanded(!expanded);
     refreshComments();
     console.log(commentList);
   };
   
   const handleLike = () => {
    setLiked(!liked);
   };

   const refreshComments = () => {
    fetch("/comments?posId=" + postId)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setCommentList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
   }

   useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments()
   }, [commentList])

   return(
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
        title={title}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton 
        onClick={handleLike}
        aria-label="add to favorites">
          <FavoriteIcon style ={liked? {color: "red" }: null}/>
        </IconButton>
       
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <InsertCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent : "center",
              alignItems : "center",
              backgroundColor: '#f0f5ff'
          }}>
            {error? "error":
            isLoaded? commentList.map(comment => (
              <Comment userId = {1} userName = {"USER"} text = {comment.text}></Comment>
            )): "Loading"}
              <CommentForm userId = {1} userName = {"USER"} postId = {postId} ></CommentForm>
          </Container>
      </Collapse>
    </Card>
    </div>
   )
}

export default Post;