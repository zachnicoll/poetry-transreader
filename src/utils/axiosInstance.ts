import axios, { AxiosError } from "axios";
import { Response } from "express";

const axiosInstance = axios.create({
  baseURL: "https://poetrydb.org",
});

export const handleAxiosError = (
  e: AxiosError,
  response: Response
): Response => {
  response.status(e?.code ? parseInt(e.code) : 500);
  return response.json({ error: e.message });
};

export default axiosInstance;
