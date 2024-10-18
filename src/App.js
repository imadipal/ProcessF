import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import QuestionView from "./components/QuestionView";
import AdminDashboard from "./components/AdminDashboard";
import CompletedQuestions from "./components/CompletedQuestions";
import Navbar from "./components/NavBar";
import {ThemeProvider} from "@mui/styles";
import {useTheme} from "@mui/material";

const App = () => {
    const theme = useTheme();
  return (
      <Router>
          <ThemeProvider theme={theme}>
              <Navbar />
          </ThemeProvider>
        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/question" element={<QuestionView />} />
            <Route path="/completedquestions" element={<CompletedQuestions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
  );
};

export default App;
