import express from "express";
import axiosInstance, { handleAxiosError } from "../utils/axiosInstance";
import { PoemError, PoemResponse } from "../types";
import { removeDuplicatePoems } from "../utils/common";
import { AxiosError } from "axios";

const API_ENDPOINT = "/title";
const POEM_ENDPOINT = "/title";
const router = express.Router({ strict: true });

/**
 * @method GET
 * @description Fetches all poems with a title that contains `searchTerm` from Poetry DB
 * @returns PoemResponse[] or 404 if no poems are found
 */
router.get(`${API_ENDPOINT}/:searchTerm/`, async (request, response) => {
  try {
    const poemsByTitle = await axiosInstance.get<PoemResponse[] | PoemError>(
      `${POEM_ENDPOINT}/${request.params.searchTerm}`
    );

    if ((poemsByTitle.data as PoemError).status === 404) {
      throw {
        code: 404,
        message: "No poems found matching that title",
      };
    }

    response.json(removeDuplicatePoems(poemsByTitle.data as PoemResponse[]));
  } catch (error) {
    handleAxiosError(error as AxiosError, response);
  }
});

export default router;
