
import React, { useState } from 'react';
import AuthService from "../services/AuthService";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Note the change in import path for icons


const AdminDashboard = () => {
    const [heading, setHeading] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [error, setError] = useState("");

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            await AuthService.addQuestion({ heading, questionText });
            alert("Question added successfully!");
            setHeading("");
            setQuestionText("");
        } catch (err) {
            setError("Failed to add question");
        }
    };

    const paperStyle = { padding: 20, height: 'auto', width: 'auto', margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Add Question</h2>
                    {error && <p>{error}</p>}
                </Grid>
                {/* Wrap inputs and button inside a form */}
                <form onSubmit={handleAddQuestion}>
                    <TextField
                        label='Heading'
                        type="text"
                        placeholder="Heading"
                        onChange={(e) => setHeading(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                    <TextField
                        label='Question Text'
                        placeholder="Question Text"
                        onChange={(e) => setQuestionText(e.target.value)}
                        type='text'
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={24}
                        fullWidth
                        required
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}

export default AdminDashboard;

