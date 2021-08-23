import express from "express";
import axiosInstance from "../utils/axiosInstance";
import { PoemResponse } from "../types";

const API_ENDPOINT = "/random";
const POEM_ENDPOINT = "/random";
const router = express.Router();

router.get(`${API_ENDPOINT}/:numRandom`, async (request, response) => {
  const randomPoems = await axiosInstance.get<PoemResponse[]>(
    `${POEM_ENDPOINT}/${request.params.numRandom}`
  );

  response.json(randomPoems.data);
});

export default router;
