import { useEffect, useState } from "react";

import axiosInstance from "../axiosInstance";

interface Review {
  id: number;
  companyId: number;
  reviewer: string;
  reviewerUsername: string;
  review: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  name: string;
  typeId: number;
  workModelId: number;
  address: string;
  road: string;
  village: string;
  district: string;
  province: string;
  zipcode: string;
  telephone: string;
  reviews: Review[];
  averageRating: number;
}

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
