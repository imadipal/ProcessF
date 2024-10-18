import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import { makeStyles} from "@mui/styles";
import { Link } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(5),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function Navbar() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <img
                    src="/android-chrome-512x512.png"
                    alt="Process Logo"
                    style={{
                        width: "40px", // Adjust size as needed
                        height: "40px", // Adjust size as needed
                        objectFit: "contain", // Maintains aspect ratio
                        marginRight: theme.spacing(2), // Space between logo and nav links
                        cursor: "pointer",
                    }}

                />
                {isMobile ? (
                    <DrawerComponent/>
                ) : (
                    <div className={classes.navlinks}>
                        <Link to="/question" className={classes.link}>
                            Question
                        </Link>
                        <Link to="/completedquestions" className={classes.link}>
                            CompletedQuestions
                        </Link>

                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
