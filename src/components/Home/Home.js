import { Container } from "@mui/material";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import React, {useState, useEffect} from "react";

function Home(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    // postlara ekleme yaptıktan sonra sayfa yenilenmesi için
   const refreshPosts = () => {
    fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
   }

   // [] arasına yazdığımız liste etkilendiğinde refresh yapmak istediğimiz liste olmalı
   useEffect(() => {
    refreshPosts()
   }, [postList])


    if(error){
        return <div> Error !!! </div>
    }else if(!isLoaded){
        return <div> Loading... </div>
    }else{
        return (

            <div fixed style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f5ff"
                
            }}>
                <PostForm userId= {1} userName= {"userName"} refreshPosts = {refreshPosts} />
                {postList.map(post => (
                    <Post userId= {post.userId} userName= {post.userName}
                    title={post.title} text={post.text}></Post>
                ))}
            </div>
        );
    }
}
export default Home;