import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Note the change in import path for icons


const QuestionView = () => {
    const [question, setQuestion] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [completedQuestions, setCompletedQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await AuthService.getRandomQuestion();
                setQuestion(response.data);
                setLoading(false);
            } catch (err) {
                console.log("Error fetching question", err);
                setLoading(false);
            }
        };

        const fetchCompletedQuestions = async () => {
            try {
                const response = await AuthService.getCompletedQuestions();
                setCompletedQuestions(response.data);
            } catch (err) {
                console.log("Error fetching completed questions", err);
            }
        };

        fetchQuestion();
        fetchCompletedQuestions();
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
        // <div>
        //     <h1>Questions</h1>
        //     {loading ? (
        //         <p>Loading...</p>
        //     ) : (
        //         <>
        //             <h2>{question?.heading}</h2>
        //             <p>{question?.questionText}</p>
        //             <button onClick={handleMarkDone}>Mark as Done</button>
        //         </>
        //     )}
        //
        //     <h2>Completed Questions</h2>
        //     <ul>
        //         {completedQuestions.map((q) => (
        //             <li key={q.questionId}>{q.questionId}</li>
        //         ))}
        //     </ul>
        // </div>

        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Question</h2>
                    {error && <p>{error}</p>}
                </Grid>
                {/* Wrap inputs and button inside a form */}
                <form onSubmit={handleMarkDone}>
                    <TextField
                        label='Heading'
                        type="text"
                        placeholder={question?.heading}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                    <TextField
                        label='Question Text'
                        placeholder={question?.questionText}
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
