import { useEffect, useState } from 'react';
import axios from 'axios';
import { CommentPost } from '../CommentPost/CommentPost';
import { CommentList } from '../CommentList/CommentList';

export const ListPost = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //After added QUERY microservice we'r using posts from there
        // const res = await axios.get("http://localhost:5002/posts");

        const res = await axios.get("http://localhost:5003/posts");
        setPosts(res.data)
    }


    //and there after QUERY SERVICE
    // <CommentList postId={post.id} />

    const renderPosts = Object.values(posts).map((post) => {
        return (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <CommentList comments={post.comments} />
                <CommentPost postId={post.id} />
            </div>
        );
    });

    return (
        <>
            {renderPosts}
        </>
    )
}