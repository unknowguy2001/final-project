import { useEffect, useState } from "react";

import { Company } from "../../interfaces/company";
import { getTop4PopularCompanies } from "../../services/companiesService";

export const useFunctions = () => {
  const [top4PopularCompanies, setTop4PopularCompanies] = useState<Company[]>(
    []
  );

  useEffect(() => {
    const abortController = new AbortController();

    const handleGetTop4PopularCompanies = async (signal: AbortSignal) => {
      const response = await getTop4PopularCompanies({
        signal,
      });
      setTop4PopularCompanies(response.data.items);
    };

    handleGetTop4PopularCompanies(abortController.signal);

    return () => abortController.abort();
  }, []);

  return { top4PopularCompanies };
};
