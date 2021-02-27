import axios from "axios";

export const getQuestions = () => {
    return axios.get("https://opentdb.com/api.php?amount=5");
}