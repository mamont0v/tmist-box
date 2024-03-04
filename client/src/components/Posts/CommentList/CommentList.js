// import { useEffect, useState } from "react"
// import axios from "axios";

// ({ postId })
export const CommentList = ({ comments }) => {
    //After adding QEURY SERVICE 
    // const [comments, setComments] = useState([]);

    // const fetchComments = async () => {
    //     const res = await axios.get(`http://localhost:5001/posts/${postId}/comments`)

    //     setComments(res.data)
    // }


    const showCommentsList = comments.map(el => {
        return <li key={el.id}>{el.content}</li>
    })

    // useEffect(() => {
    //     fetchComments()
    // }, [])

    return (
        <div>
            <ul>{showCommentsList}</ul>
        </div>
    )
}