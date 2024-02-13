import { useEffect, useState } from "react";

import { Company } from "../../interfaces/company";
import { getTopPopularCompanies } from "../../services/companiesService";

export const useFunctions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topPopularCompanies, setTopPopularCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const handleGetTopPopularCompanies = async (signal: AbortSignal) => {
      setIsLoading(true);
      const response = await getTopPopularCompanies({
        signal,
      });
      setTopPopularCompanies(response.data.items);
      setIsLoading(false);
    };

    handleGetTopPopularCompanies(abortController.signal);

    return () => abortController.abort();
  }, []);

  return { topPopularCompanies, isLoading };
};
