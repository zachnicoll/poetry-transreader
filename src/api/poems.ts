import { axiosInstance } from "./apiConfig";
import { PoemResponse, SearchType } from "./types";

const TITLE_ENDPOINT = "/title";
const AUTHOR_ENDPOINT = "/author";
const RANDOM_ENDPOINT = "/random";

const searchByTitle = async (searchTerm: string): Promise<PoemResponse[]> => {
  const poems = await axiosInstance.get<PoemResponse[]>(
    `${TITLE_ENDPOINT}/${searchTerm}/`
  );
  return poems.data;
};

const searchByAuthor = async (searchTerm: string): Promise<PoemResponse[]> => {
  const poems = await axiosInstance.get<PoemResponse[]>(
    `${AUTHOR_ENDPOINT}/${searchTerm}/`
  );
  return poems.data;
};

export const searchBy = async (
  type: SearchType,
  searchTerm: string
): Promise<PoemResponse[]> => {
  return type === "title"
    ? await searchByTitle(searchTerm)
    : await searchByAuthor(searchTerm);
};

export const random = async (
  numberOfPoems: number
): Promise<PoemResponse[]> => {
  const poems = await axiosInstance.get<PoemResponse[]>(
    `${RANDOM_ENDPOINT}/${numberOfPoems}/`
  );
  return poems.data;
};
