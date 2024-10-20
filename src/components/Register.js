


import React, { useState } from 'react';
import AuthService from "../services/AuthService";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Note the change in import path for icons


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(username, password);
            await AuthService.login(username, password);
        } catch (err) {
            setError("Registration failed!");
        }
    };

    const paperStyle = { padding: 20, height: 'auto', width: 380, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    return (
        <Grid
            container
            spacing={0}
            style={{ minHeight: '100vh' }} // Full viewport height
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
        >
            <Paper align='center' elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign Up</h2>
                    {error && <p>{error}</p>}
                </Grid>
                {/* Wrap inputs and button inside a form */}
                <form onSubmit={handleRegister}>
                    <TextField
                        label='Username'
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter username'
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                    <TextField
                        label='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter password'
                        type='password'
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                    {/* Attach the handleLogin function to the button */}
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography>
                    Do you have an account?
                    <Link href="/" style={{ marginLeft: '4px' }}>
                        Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Register;
