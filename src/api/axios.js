import axios from "axios";

const API = axios.create({
  baseURL: "https://personal-portfolio-tw0b.onrender.com/api",
});

export default API;