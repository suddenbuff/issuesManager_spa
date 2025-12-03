import {useState} from "react";
import TokenInput from "./TokenInput.jsx";
import RepositoryInput from "./RepositoryInput.jsx";
import IssuesList from "./IssuesList.jsx";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [issues, setIssues] = useState(false)
  const handleUnlock = () => {
    setIsAuth(true);
  };
  const handleRender = () => {
    setIssues(true);
  };

  if (!isAuth) {
    return <TokenInput auth={handleUnlock} />;
  }

  return <>
    <RepositoryInput render={handleRender} />
    {issues && <IssuesList/>}
  </>
}

export default App
