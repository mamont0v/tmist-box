import { useState } from 'react'
import axios from 'axios'


export const CommentPost = ({ postId }) => {
    const [content, setContent] = useState('');

    const sendComment = async (event) => {
        event.preventDefault();

        await axios.post(`http://localhost:5005/posts/${postId}/comments`, {
            content
        })

        setContent('')
    }

    return (
        <form onSubmit={sendComment}>
            <div>
                <label>Новый пост</label>
                <input name="comments" value={content} onChange={e => setContent(e.target.value)} />
            </div>
            <div>
                <button>Создать комментарий</button>
            </div>
        </form>
    )
}