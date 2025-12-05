import {useState, useEffect} from "react";
import IssueCard from "./IssueCard";
import {Box, Typography, CircularProgress, Button, Stack, Alert, Divider,} from "@mui/material";

const IssuesList = ({ token, link }) => {
    const [owner, repo] = link.split("/");
    const [issues, setIssues] = useState([]);
    const [repoId, setRepoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cursor, setCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const ISSUES_QUERY = `query($owner: String!, $repo: String!, $cursor: String) {repository(owner: $owner, name: $repo) {id issues(first: 20, states: [OPEN, CLOSED], after: $cursor) {edges {node {id number title body comments(first: 100) {totalCount}}} pageInfo {endCursor hasNextPage}}}}`;
    const ADD_COMMENT_MUTATION = `mutation($input: AddCommentInput!) {addComment(input: $input) {commentEdge {node {id body}}}}`;

    const fetchIssues = async (loadMore = false) => {
        try {
            if (loadMore) {
                setIsLoadingMore(true);
            }
            else {
                setLoading(true);
            }
            const response = await fetch("https://api.github.com/graphql", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: ISSUES_QUERY,
                    variables: { owner, repo, cursor: loadMore ? cursor : null },
                }),
            });
            const data = await response.json();
            if (data.errors) throw new Error(data.errors[0].message);
            const repoData = data.data.repository;
            if (!repoId) setRepoId(repoData.id);
            const newIssues = repoData.issues.edges.map((e) => e.node);
            if (loadMore) {
                setIssues((prev) => [...prev, ...newIssues]);
            }
            else {
                setIssues(newIssues);
            }
            setCursor(repoData.issues.pageInfo.endCursor);
            setHasNextPage(repoData.issues.pageInfo.hasNextPage);
            setError(null);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    const postComment = async (issueId, comment) => {
        if (!comment.trim() || !repoId) return;
        try {
            const response = await fetch("https://api.github.com/graphql", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: ADD_COMMENT_MUTATION,
                    variables: {
                        input: {
                            subjectId: issueId,
                            body: comment,
                        },
                    },
                }),
            });
            const data = await response.json();
            if (data.errors) throw new Error(data.errors[0]?.message);
            fetchIssues();
        }
        catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (owner && repo && token) {
            fetchIssues();
        }
    }, [owner, repo]);

    if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
    if (error) return <Box mt={2}><Alert severity="error">Ошибка: {error}</Alert></Box>

    return (
        <Box>
            <Typography variant="h4" fontWeight={600} mb={2}>
                Issues для {owner}/{repo}{" "}
                <Typography component="span" color="text.secondary">({issues.length})</Typography>
            </Typography>

            <Divider sx={{ mb: 3 }} />
            {issues.length === 0 ? (<Alert severity="info">Открытые issues не найдены</Alert>) : (
                <Stack spacing={2}>
                    {issues.map((issue) => (<IssueCard key={issue.id} issue={issue} onPostComment={postComment} />))}
                </Stack>
            )}

            {hasNextPage && (
                <Box textAlign="center" mt={3}>
                    <Button variant="contained" onClick={() => fetchIssues(true)} disabled={isLoadingMore} size="large">{isLoadingMore ? "Загрузка..." : "Загрузить ещё"}</Button>
                </Box>
            )}
        </Box>
    );
};

export default IssuesList;
