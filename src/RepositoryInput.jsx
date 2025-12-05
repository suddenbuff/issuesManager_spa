import {useState} from "react";

async function checkRepository(token, owner, repoName) {
    const query = `query {repository(owner: "${owner}", name: "${repoName}") {name owner {login}}}`;
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
    if (!data.data || data.errors) throw new Error("Неправильная ссылка или недостаток прав");
    return data.data.repository;
}

const RepositoryInput = ({render, token}) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);
        try {
            const formData = new FormData(e.target);
            const repository = formData.get('repository');
            const url = new URL(repository);
            const [owner, repo] = url.pathname.split("/").filter(Boolean);
            const data = await checkRepository(token, owner, repo);
            render(data)
        }
        catch (error) {
            setError(error.message);
        }

    }

    const [error, setError] = useState(null);

    return <>
        <h1>Введите репозиторий</h1>
        <form onSubmit={handleSubmit}>
            <input name="repository"/> {/* Можно добавить валидацию ссылки, если она имеет какую-то особую форму, хотя учитывая количество запросов к api, мб и не нужно*/}
            <input type="submit" value="Отправить"/>
        </form>
        {error && <div>Ошибка: {error}</div>}
    </>
}

export default RepositoryInput;