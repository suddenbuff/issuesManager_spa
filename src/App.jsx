import { useState } from "react";
import TokenInput from "./TokenInput.jsx";
import RepositoryInput from "./RepositoryInput.jsx";
import IssuesList from "./IssuesList.jsx";
import {AppBar, Toolbar, Typography, Button, Container, Box, Stack} from "@mui/material";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [data, setData] = useState(localStorage.getItem("data") || false);
  const [login, setLogin] = useState(localStorage.getItem("login") || false);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    localStorage.removeItem("data");
    setToken(false);
    setLogin(false);
    setData(false);
  }

  const handleUnlock = (token, login) => {
    setToken(token);
    setLogin(login);
    localStorage.setItem("token", token);
    localStorage.setItem("login", login);
  };

  const handleRender = (data) => {
    setData(data);
    localStorage.setItem("data", `${data.owner.login}/${data.name}`);
  };

  if (!token) return <Container maxWidth="sm"><Box mt={8}><TokenInput auth={handleUnlock}/></Box></Container>

  return <>
        <AppBar position="static" color="primary">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">GitHub Issues Manager</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body1">Вход: {login}</Typography>
              <Button color="inherit" onClick={logout} variant="outlined">Выйти</Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md">
          <Box mt={4} mb={4}>
            <RepositoryInput render={handleRender} token={token} />
            {data && (<Box mt={4}><IssuesList link={localStorage.getItem("data")} token={token}/></Box>)}
          </Box>
        </Container>
      </>
}

export default App;

