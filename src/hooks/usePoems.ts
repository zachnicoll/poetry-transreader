import { useCallback, useEffect, useState } from "react";
import { API } from "../api";
import { PoemResponse, SearchType } from "../api/types";

interface HookReturn {
  loading: boolean;
  poems: PoemResponse[];
}

const usePoems = (type: SearchType, searchTerm: string): HookReturn => {
  const [loading, setLoading] = useState(false);
  const [poems, setPoems] = useState<PoemResponse[]>([]);

  const search = useCallback(async (): Promise<void> => {
    if (searchTerm.length > 0) {
      setLoading(true);

      try {
        const poemResults = await API.poems.searchBy(type, searchTerm);
        setPoems(poemResults);
      } catch (e) {
        console.error(e);
        alert("Could not find any poems matching that search term.");
      }

      setLoading(false);
    }
  }, [type, searchTerm]);

  useEffect(() => {
    search();
  }, [search]);

  return { loading, poems };
};

export default usePoems;
