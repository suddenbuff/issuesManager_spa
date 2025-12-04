async function getRepoGraphQL(token, owner, repoName) {
    const query = `
    query {
      repository(owner: "${owner}", name: "${repoName}") {
        name
        description
        isPrivate
        url
        stargazerCount
        forkCount
        owner {
          login
        }
      }
    }
  `;

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const data = await res.json();

    if (data.errors) {
        console.log("Репозиторий не найден или нет доступа:", data.errors);
        return null;
    }

    console.log("Информация о репозитории:", data.data.repository);
    return data.data.repository;
}

const RepositoryInput = ({ render, token }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const repository = formData.get('repository');
        const url = new URL(repository);
        const [owner, repo] = url.pathname.split("/").filter(Boolean);
        getRepoGraphQL(token, owner, repo).then(repoData => {if (repoData) render(repoData)});
    }

    return <>
        <div> {/* style={} добавить стилей */}
            <h1>Введите репозиторий</h1>
            <form onSubmit={handleSubmit}>
                <input name="repository"/> {/* Можно добавить валидацию ссылки, если она имеет какую-то особую форму */}
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    </>
}

export default RepositoryInput;