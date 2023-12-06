import { useEffect, useState } from "react";

import { axiosInstance } from "../axiosInstance";
import { Company } from "../interfaces/company";

const usePopularCompanies = () => {
  const [top4PopularCompanies, setTop4PopularCompanies] = useState<Company[]>(
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    const fetchTop4PopularCompanies = async () => {
      const response = await axiosInstance.get("/companies/top-4-popular", {
        signal: abortController.signal,
      });
      setTop4PopularCompanies(response.data.items);
    };

    fetchTop4PopularCompanies();

    return () => abortController.abort();
  }, []);

  return {
    top4PopularCompanies,
  };
};
export default usePopularCompanies;
