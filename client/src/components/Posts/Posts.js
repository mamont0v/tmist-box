import { CreatePost } from "./CreatePost/CreatePost"
import { ListPost } from "./ListPosts/ListPost"


export const Posts = () => {
    return (
        <>
            <h1>Создание нового поста</h1>
            <CreatePost />
            <h1>Список созданных постов</h1>
            <ListPost />
        </>
    )
}