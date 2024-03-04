import { useState } from "react"
import axios from 'axios';

export const CreatePost = () => {
    const [title, setTitle] = useState('')

    const submitPost = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:5002/posts', {
            title
        });

        setTitle('');
    }

    return (
        <div>
            <form onSubmit={submitPost}>
                <div>
                    <label>Название</label>
                    <input
                        name="title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <button>Создать</button>
            </form>
        </div>
    )
}