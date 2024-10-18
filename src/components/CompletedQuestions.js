import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Note the change in import path for icons


const CompletedQuestions = () => {
    const [completedQuestions, setCompletedQuestions] = useState([]);

    useEffect(() => {

        const fetchCompletedQuestions = async () => {
            try {
                const response = await AuthService.getCompletedQuestions();
                setCompletedQuestions(response.data);
            } catch (err) {
                console.log("Error fetching completed questions", err);
            }
        };
        fetchCompletedQuestions();
    }, []);



    const paperStyle = { padding: 20, height: 'auto', width: 'auto', margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };

    return (

        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Completed Questions</h2>
                </Grid>
                {/* Wrap inputs and button inside a form */}
                <ul>
                     {completedQuestions.map((q) => (
                                 <li key={q.questionId}>{q.questionId}</li>
                             ))}
                </ul>
            </Paper>
        </Grid>
    );
};

export default CompletedQuestions;
