import express from "express";
import axiosInstance, { handleAxiosError } from "../utils/axiosInstance";
import { PoemResponse } from "../types";
import { removeDuplicatePoems } from "../utils/common";

const API_ENDPOINT = "/random";
const POEM_ENDPOINT = "/random";
const router = express.Router({ strict: true });

router.get(`${API_ENDPOINT}/:numRandom/`, async (request, response) => {
  try {
    const randomPoems = await axiosInstance.get<PoemResponse[]>(
      `${POEM_ENDPOINT}/${request.params.numRandom}`
    );

    response.json(removeDuplicatePoems(randomPoems.data));
  } catch (error) {
    handleAxiosError(error, response);
  }
});

export default router;
