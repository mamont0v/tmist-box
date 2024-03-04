import axios from 'axios';

export const Language = () => {
    let callPython = 'hello';

    const createSomething = async () => {
        await axios.post('/sast/language/test', callPython)
        .catch(() => {
        })
    }

    return (
        <>
            <h1>Обновлять не над1</h1>
            <button onClick={createSomething}>Нажми на меня</button>
            {callPython}
        </>
    )

}