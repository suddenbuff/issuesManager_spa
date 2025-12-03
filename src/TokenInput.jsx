const tokenInput = ({ auth }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const token = formData.get('token');
        {/* логика аутентификации на gh */}
        if (token === '1') { {/* заглушка */}
            auth()
        }
        else {
            alert('Неверно')
        }
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