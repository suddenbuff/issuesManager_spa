import {useState} from "react";
import TokenInput from "./TokenInput.jsx";
import RepositoryInput from "./RepositoryInput.jsx";
import IssuesList from "./IssuesList.jsx";

function App() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    localStorage.removeItem("data");
    setToken(false);
    setLogin(false);
    setData(false);
  }

  const [token, setToken] = useState(localStorage.getItem("token") || false)
  const [data, setData] = useState(localStorage.getItem("data") || false)
  const [login, setLogin] = useState(localStorage.getItem("login") || false)
  const handleUnlock = (token, login) => {
    setToken(token)
    setLogin(login)
    localStorage.setItem("token", token)
    localStorage.setItem("login", login)
  };
  const handleRender = (data) => {
    setData(true)
    localStorage.setItem("data", `${data.owner.login}/${data.name}`)
  };

  if (!token) {
    return <TokenInput auth={handleUnlock}/>;
  }

  return <>
    <h1>Выполнен вход как {login}</h1>
    <button type="button" onClick={logout}>Выйти</button>
    <RepositoryInput render={handleRender} token={token}/>
    {data && <IssuesList link={localStorage.getItem("data")} token={token}/>}
  </>
}

export default App
