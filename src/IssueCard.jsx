import React, { useState, memo } from "react";
import {Card, CardContent, CardActions, Typography, TextField, Button, Box, Divider,} from "@mui/material";

const IssueCard = memo(({ issue, onPostComment }) => {
    const [commentText, setCommentText] = useState("");

    const handleSubmit = () => {
        if (commentText.trim()) {
            onPostComment(issue.id, commentText);
            setCommentText("");
        }
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>#{issue.number} — {issue.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>{issue.body || <i>Без описания</i>}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" color="text.secondary">Всего комментариев: {issue.comments.totalCount}</Typography>
            </CardContent>

            <CardActions sx={{ display: "block", px: 2, pb: 2 }}>
                <Box display="flex" flexDirection="column" gap={1}>
                    <TextField multiline minRows={2} maxRows={6} label="Напишите комментарий" variant="outlined" value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                    <Button variant="contained" onClick={handleSubmit} disabled={!commentText.trim()}>Отправить</Button>
                </Box>
            </CardActions>
        </Card>
    );
});

export default IssueCard;
