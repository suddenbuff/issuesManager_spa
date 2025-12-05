import {useState} from "react";
import {Box, TextField, Button, Typography, Alert, Stack, Paper} from "@mui/material";

async function checkToken(token) {
    const query = `query { viewer { login } }`;
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
    if (!data.data || data.errors) throw new Error("Неправильный токен");
    return data.data.viewer.login;
}

const TokenInput = ({ auth }) => {
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const formData = new FormData(e.target);
            const token = formData.get("token");
            const login = await checkToken(token);
            auth(token, login);
        }
        catch (error) {
            setError(error.message);
        }
    };

    return (
        <Paper p={4}>
            <Typography variant="h5" mb={2}>Введите GitHub Token</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField name="token" fullWidth/>
                    <Button type="submit" variant="contained" size="large">Войти</Button>
                    {error && <Alert severity="error">Ошибка: {error}</Alert>}
                </Stack>
            </Box>
        </Paper>
    );
};

export default TokenInput;
