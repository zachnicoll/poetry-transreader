import { PoemResponse } from "../types";

export const removeDuplicatePoems = (poems: PoemResponse[]): PoemResponse[] => {
  const uniquePoems: PoemResponse[] = [];

  poems.forEach((poem) => {
    if (!uniquePoems.some((p) => p.title === poem.title)) {
      uniquePoems.push(poem);
    }
  });

  return uniquePoems;
};
