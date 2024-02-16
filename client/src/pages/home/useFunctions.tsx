import { useEffect, useRef, useState } from "react";
import { useInViewport } from "react-in-viewport";

import { Company } from "../../interfaces/company";
import { getProvinces } from "../../services/commonService";
import { getTopPopularCompanies } from "../../services/companiesService";

const useFunctions = () => {
  const [topPopularCompanies, setTopPopularCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [provinces, setProvinces] = useState<string[]>([]);
  const [isProvincesLoading, setIsProvincesLoading] = useState(false);

  const topPopularCompaniesRef = useRef(null);
  const { inViewport, enterCount } = useInViewport(topPopularCompaniesRef, {
    threshold: 0.5,
  });

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
    if (inViewport && enterCount === 1) {
      const handleGetTopPopularCompanies = async () => {
        setIsLoading(true);
        const response = await getTopPopularCompanies({});
        setTopPopularCompanies(response.data.items);
        setIsLoading(false);
      };

      handleGetTopPopularCompanies();
    }
  }, [inViewport, enterCount]);

  return {
    topPopularCompanies,
    isLoading,
    provinces,
    isProvincesLoading,
    topPopularCompaniesRef,
  };
};

export default useFunctions;
