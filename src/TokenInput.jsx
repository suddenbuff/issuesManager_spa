import {useState} from 'react'

async function checkToken(token) {
    const query = `query {viewer {login}}`;
    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query})
    });
    if (!res.ok) throw new Error(`HTTP вернул ${res.status}`);
    const data = await res.json();
    if (!data.data || data.errors) throw new Error("Неправильный токен");
    return data.data.viewer.login;
}

const TokenInput = ({auth}) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);
        try {
            const formData = new FormData(e.target);
            const token = formData.get('token');
            const login = await checkToken(token)
            auth(token, login)
        }
        catch (error) {
            setError(error.message);
        }
    }

    const [error, setError] = useState(null);

    return <>
        <h1>Введите токен</h1>
        <form onSubmit={handleSubmit}>
            <input name="token"/> {/* Можно добавить валидацию токена, если он имеет какую-то особую форму, хотя учитывая количество запросов к api, мб и не нужно*/}
            <input type="submit" value="Отправить"/>
        </form>
        {error && <div>Ошибка: {error}</div>}
    </>
}

export default TokenInput;