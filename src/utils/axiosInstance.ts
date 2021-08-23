import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://poetrydb.org",
});

export default axiosInstance;
