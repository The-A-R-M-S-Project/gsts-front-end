import axios from "axios";
const API_URL = "https://arms-graduate-student-tracker.herokuapp.com/api";

let settings = {
    baseURL: API_URL
};

export default axios.create(settings);
