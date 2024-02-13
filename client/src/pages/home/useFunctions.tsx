import { useEffect, useState } from "react";

import { Company } from "../../interfaces/company";
import { getProvinces } from "../../services/commonService";
import { getTopPopularCompanies } from "../../services/companiesService";

export const useFunctions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topPopularCompanies, setTopPopularCompanies] = useState<Company[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [isProvincesLoading, setIsProvincesLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const handleGetProvinces = async (signal: AbortSignal) => {
      setIsProvincesLoading(true);
      const response = await getProvinces({
        signal,
      });
      setProvinces(response.data.items);
      setIsProvincesLoading(false);
    };

    handleGetProvinces(abortController.signal);

    return () => abortController.abort();
  }, []);

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

  return { topPopularCompanies, isLoading, provinces, isProvincesLoading };
};
