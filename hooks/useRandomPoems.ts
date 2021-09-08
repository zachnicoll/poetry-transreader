import { useEffect, useState } from "react";
import { PoemResponse } from "API/types";
import { API } from "API";

interface HookReturn {
  poems: PoemResponse[];
  loading: boolean;
}

const useRandomPoems = (): HookReturn => {
  const [poems, setPoems] = useState<PoemResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPoems = async (): Promise<void> => {
    setLoading(true);

    try {
      const _poems = await API.poems.random(20);
      setPoems(_poems);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return { poems, loading };
};

export default useRandomPoems;
