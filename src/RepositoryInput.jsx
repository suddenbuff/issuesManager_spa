import {useState} from "react";
import {Box, TextField, Button, Typography, Alert, Stack, Paper} from "@mui/material";

async function checkRepository(token, owner, repoName) {
    const query = `query {repository(owner: "${owner}", name: "${repoName}") {name owner { login }}}`;
    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error(`HTTP вернул ${res.status}`);
    const data = await res.json();
    if (!data.data || data.errors)
        throw new Error("Неправильная ссылка или недостаток прав");
    return data.data.repository;
}

const RepositoryInput = ({ render, token }) => {
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const formData = new FormData(e.target);
            const repository = formData.get("repository");
            const url = new URL(repository);
            const [owner, repo] = url.pathname.split("/").filter(Boolean);
            const data = await checkRepository(token, owner, repo);
            render(data);
        }
        catch (error) {
            setError(error.message);
        }
    };

    return (
        <Paper p={4}>
            <Typography variant="h5" mb={2}>Введите ссылку на репозиторий</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField name="repository" label="Например: https://github.com/facebook/react" fullWidth/>
                    <Button type="submit" variant="contained" size="large">Отправить</Button>
                    {error && <Alert severity="error">Ошибка: {error}</Alert>}
                </Stack>
            </Box>
        </Paper>
    );
};

export default RepositoryInput;
