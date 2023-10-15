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
   const {title, text, userId, userName, postId, likes} = props;
   const [expanded, setExpanded] = React.useState(false);

   const [error, setError] = React.useState(null);
   const [isLoaded, setIsLoaded] = React.useState(false);

   const [commentList, setCommentList] = React.useState([]);
   const [isLiked, setIsLiked] = React.useState(false);
   const [likeCount, setLikeCount] = React.useState(likes.lenght || 0);
   const [likeId, setLikeId] = useState(null);

   const isInitialMount = useRef(true);

   const handleExpandClick = () => {
     setExpanded(!expanded);
     refreshComments();
     console.log(commentList);
   };
   
   const handleLike = () => {
    setIsLiked(!isLiked);
    if(!isLiked){
      saveLike();
      setLikeCount(likeCount + 1);
    }
    else{
      deleteLike();
      setLikeCount(likeCount - 1);
    }
   };

   const checkLikes = () => {
    var likeControl = likes.find((like => like.userId === userId));
    if( likeControl != null){
      setLikeId(1);
      setIsLiked(true);
    }
      
   }

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

   const saveLike = () => {
    fetch("/likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            postId: postId,
            userId: userId,
        }),
    })
    .then((res) => res.json())
    .catch((err) => console.log("error"))
   }

   const deleteLike = () => {
    var likeId = likes.find((like => like.userId === userId)).id;
    fetch("/likes/" + likeId,
    {
        method: "DELETE",
    })
    .catch((err) => console.log("error"))
   }


   useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments()
   }, [commentList])

   useEffect(() => {
    checkLikes()
   }, [])


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
          <FavoriteIcon style ={isLiked? {color: "red" }: null}/>      
        </IconButton>
        {likeCount}
       
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