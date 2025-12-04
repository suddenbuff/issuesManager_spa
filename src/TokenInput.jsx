async function checkTokenGraphQL(token) {
    const query = `
    query {
      viewer {
        login
        id
        email
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
        console.log("Токен невалиден", data.errors);
        return null;
    }

    console.log("Токен валиден. Пользователь:", data.data.viewer.login);
    return data.data.viewer;
}

const tokenInput = ({ auth }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const token = formData.get('token');
        checkTokenGraphQL(token).then(() => auth(token)).catch(err => console.log(err));
    }

    return <>
        <div> {/* style={} добавить стилей, чтоб был чисто по центру */}
            <h1>Введите токен</h1>
            <form onSubmit={handleSubmit}>
                <input name="token"/> {/* Можно добавить валидацию токена, если он имеет какую-то особую форму */}
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    </>
}

export default tokenInput;