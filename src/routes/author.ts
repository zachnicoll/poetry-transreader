import express from "express";
import axiosInstance from "../utils/axiosInstance";
import { PoemResponse } from "../types";

const API_ENDPOINT = "/author";
const POEM_ENDPOINT = "/author";
const router = express.Router();

router.get(`${API_ENDPOINT}/:searchTerm`, async (request, response) => {
  const poemsByAuthor = await axiosInstance.get<PoemResponse[]>(
    `${POEM_ENDPOINT}/${request.params.searchTerm}`
  );

  response.json(poemsByAuthor.data);
});

export default router;
