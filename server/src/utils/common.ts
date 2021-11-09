import { PoemResponse } from "../types";

/**
 * Poetry DB often returns poems with the same title - this function ensures all
 * poems of a PoemRespone[] are unique in terms of title.
 * @param poems Poem array potentially containing duplicate poems
 * @returns PoemRespone[] with duplicates (by title) removed
 */
export const removeDuplicatePoems = (poems: PoemResponse[]): PoemResponse[] => {
  const uniquePoems: PoemResponse[] = [];

  poems.forEach((poem) => {
    if (!uniquePoems.some((p) => p.title === poem.title)) {
      uniquePoems.push(poem);
    }
  });

  return uniquePoems;
};
