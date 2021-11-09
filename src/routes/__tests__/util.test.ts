import { removeDuplicatePoems } from "../../utils/common";
import { duplicatePoems, duplicatesRemovedPoems } from "./data/util.data";

it("Removes duplicate poems", () => {
  expect(removeDuplicatePoems(duplicatePoems)).toStrictEqual(
    duplicatesRemovedPoems
  );
});
