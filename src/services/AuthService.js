import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8091";

const register = (username, password) => {
    return axios.post(`${API_URL}/auth/register`, { username, password });
};

const login = (username, password) => {
    return axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true });
};

const getRandomQuestion = () => {
    return axios.get(`${API_URL}/user/get-random-question`, { withCredentials: true });
};

const markQuestionAsDone = (questionId) => {
    return axios.post(`${API_URL}/user/mark-question`, { questionId: questionId }, { withCredentials: true });
};

const getCompletedQuestions = () => {
    return axios.get(`${API_URL}/user/completed-questions`, { withCredentials: true });
};

const addQuestion = (question) => {
    return axios.post(`${API_URL}/admin/add-question`, {question: question}, { withCredentials: true });
};

const logout = () => {
    return axios.post(`${API_URL}/auth/logout`, { withCredentials: true });
};

export default {
    register,
    login,
    logout,
    getRandomQuestion,
    markQuestionAsDone,
    getCompletedQuestions,
    addQuestion
};
