import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Note the change in import path for icons


const QuestionView = () => {
    const [question, setQuestion] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await AuthService.getRandomQuestion();
                console.log(response);
                setQuestion(response.data);
                setLoading(false);
            } catch (err) {
                console.log("Error fetching question", err);
                setLoading(false);
            }
        };

        fetchQuestion();
    }, []);

    const handleMarkDone = async () => {
        try {
            await AuthService.markQuestionAsDone(question.id);
            alert("Question marked as done");
            window.location.reload();
        } catch (err) {
            setError("Login failed!");
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
                    <h2>Question</h2>
                    {error && <p>{error}</p>}
                </Grid>
                {/* Wrap inputs and button inside a form */}
                <form onSubmit={handleMarkDone}>
                    <input type="hidden" name="questionId" value={question?.id || ''}/>
                    <TextField
                        type="text"
                        value={question?.heading || ''}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                    <TextField
                        value={question?.questionText || ''}
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
                        Mark as Done
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default QuestionView;
