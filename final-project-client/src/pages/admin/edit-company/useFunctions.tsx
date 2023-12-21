import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CompanyData } from "../../../interfaces/company";
import { getCompany, updateCompany } from "../../../services/companiesService";

export const useFunctions = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveCompanyClick = async () => {
    if (!companyId) return;
    await updateCompany(companyId, companyData);
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
  }, [companyId, handleGetCompany]);

  return {
    companyData,
    handleChange,
    handleSaveCompanyClick,
  };
};
