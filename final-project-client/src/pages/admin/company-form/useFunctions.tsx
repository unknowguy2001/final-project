import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  addCompany,
  getCompany,
  updateCompany,
} from "../../../services/companiesService";
import { CompanyData } from "../../../interfaces/company";

export const useFunctions = (mode: "new" | "edit") => {
  const navigate = useNavigate();
  const { companyId } = useParams<{
    companyId: string;
  }>();
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    address: "",
    road: "",
    village: "",
    district: "",
    province: "",
    zipcode: "",
    telephone: "",
  });
  const isNewMode = mode === "new";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActionClick = async () => {
    if (isNewMode) {
      await addCompany(companyData);
    } else {
      if (!companyId) return;
      await updateCompany(companyId, companyData);
    }
    navigate("/admin/companies");
  };

  const handleGetCompany = useCallback(
    async (signal?: AbortSignal) => {
      if (!companyId) return;

      const response = await getCompany(companyId, {
        signal,
      });
      setCompanyData(response.data.item);
    },
    [companyId]
  );

  useEffect(() => {
    const abortController = new AbortController();

    handleGetCompany(abortController.signal);

    return () => abortController.abort();
  }, [handleGetCompany]);

  return {
    companyData,
    handleChange,
    handleActionClick,
    isNewMode,
  };
};
