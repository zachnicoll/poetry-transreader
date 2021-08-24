import express from "express";
import axiosInstance, { handleAxiosError } from "../utils/axiosInstance";
import { PoemResponse } from "../types";

const API_ENDPOINT = "/title";
const POEM_ENDPOINT = "/title";
const router = express.Router({ strict: true });

router.get(`${API_ENDPOINT}/:searchTerm/`, async (request, response) => {
  try {
    const poemsByTitle = await axiosInstance.get<PoemResponse[]>(
      `${POEM_ENDPOINT}/${request.params.searchTerm}`
    );

    response.json(poemsByTitle.data);
  } catch (error) {
    handleAxiosError(error, response);
  }
});

export default router;
