import express from "express";
import axiosInstance from "../utils/axiosInstance";
import { PoemResponse } from "../types";

const API_ENDPOINT = "/title";
const POEM_ENDPOINT = "/title";
const router = express.Router({ strict: true });

router.get(`${API_ENDPOINT}/:searchTerm/`, async (request, response) => {
  const poemsByTitle = await axiosInstance.get<PoemResponse[]>(
    `${POEM_ENDPOINT}/${request.params.searchTerm}`
  );

  response.json(poemsByTitle.data);
});

export default router;
