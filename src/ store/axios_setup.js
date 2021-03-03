import axios from "axios";
// const API_URL = "https://arms-graduate-student-tracker.herokuapp.com/api";
const API_URL = "http://localhost:8080/api"

let settings = {
    baseURL: API_URL
};

export default axios.create(settings);
