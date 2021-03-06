import React, { useState, useEffect } from "react";
import axios from "axios";
import PostIndex from "./PostIndex";

const DisplayPost = (choosen) => {
    const [allPost, setAllPost] = useState([]);
    
    const fetchPosts = async (choosen) => {
        try {
            if(Number.isInteger(choosen.choosen) === true) {
                let res = await axios.get(`http://localhost:3001/posts/${choosen.choosen}`);
                setAllPost(res.data.payload);
            } else {
                let res = await axios.get(`http://localhost:3001/posts/`);
                setAllPost(res.data.payload);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts(choosen);
    }, [choosen])

    return(
        <div className="postFeed">
            <PostIndex allPost={allPost}/>
        </div>
    )

}

export default DisplayPost;