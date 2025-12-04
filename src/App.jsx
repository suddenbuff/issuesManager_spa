import {useState} from "react";
import TokenInput from "./TokenInput.jsx";
import RepositoryInput from "./RepositoryInput.jsx";
import IssuesList from "./IssuesList.jsx";
import RepositoryCard from "./RepositoryCard.jsx";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [issues, setIssues] = useState(false)
  const [token, setToken] = useState(false)
  const [data, setData] = useState(false)

  const handleUnlock = (token) => {
    setIsAuth(true);
    setToken(token)
  };
  const handleRender = () => {
    setIssues(true);
    setData(data)
  };

  if (!isAuth) {
    return <TokenInput auth={handleUnlock}/>;
  }

  return <>
    <RepositoryInput render={handleRender} token={token} />
    <RepositoryCard/>
    {issues && <IssuesList/>}
  </>
}

export default App
