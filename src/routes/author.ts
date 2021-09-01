import express from "express";
import axiosInstance, { handleAxiosError } from "../utils/axiosInstance";
import { PoemResponse } from "../types";
import { removeDuplicatePoems } from "../utils/common";

const API_ENDPOINT = "/author";
const POEM_ENDPOINT = "/author";
const router = express.Router({ strict: true });

router.get(`${API_ENDPOINT}/:searchTerm/`, async (request, response) => {
  try {
    const poemsByAuthor = await axiosInstance.get<PoemResponse[]>(
      `${POEM_ENDPOINT}/${request.params.searchTerm}`
    );

    response.json(removeDuplicatePoems(poemsByAuthor.data));
  } catch (error) {
    handleAxiosError(error, response);
  }
});

export default router;
