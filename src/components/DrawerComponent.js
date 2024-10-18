import React, {useEffect, useState} from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { makeStyles} from "@mui/styles";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "js-cookie";
import AuthService from "../services/AuthService";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

function DrawerComponent() {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the JWT token cookie exists
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            Cookies.remove('token'); // Remove the token from cookies
            setIsLoggedIn(false); // Set the state to logged out
            window.location.href = '/'; // Redirect to login
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
        <>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/question">Question</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/completedquestions">Completed Questions</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        {isLoggedIn && (
                            <button onClick={handleLogout}>Logout</button>
                        )}
                    </ListItem>
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    );
}
export default DrawerComponent;