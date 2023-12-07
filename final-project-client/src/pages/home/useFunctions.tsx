import { useEffect, useState } from "react";

import { Company } from "../../interfaces/company";
import * as companiesService from "../../services/companiesService";

export const useFunctions = () => {
  const [top4PopularCompanies, setTop4PopularCompanies] = useState<Company[]>(
    []
  );

  useEffect(() => {
    const abortController = new AbortController();

    const getTop4PopularCompanies = async () => {
      const response = await companiesService.getTop4PopularCompanies({
        signal: abortController.signal,
      });
      setTop4PopularCompanies(response.data.items);
    };

    getTop4PopularCompanies();

    return () => abortController.abort();
  }, []);

  return { top4PopularCompanies };
};
