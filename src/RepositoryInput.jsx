const RepositoryInput = ({ render }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const repository = formData.get('repository');
        {/* логика получения issues */}
        if (repository === '1') { {/* заглушка */}
            render()
        }
        else {
            alert('Неверно')
        }
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