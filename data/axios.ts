import axios from "axios";

const axiosInstanceAdmin = axios.create({
  baseURL: "https://v0-adminca-bk.vercel.app",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
export default axiosInstanceAdmin;
