import { useState } from "react";
import { CompanyData } from "../../../interfaces/company";
import { addCompany } from "../../../services/companiesService";
import { useNavigate } from "react-router-dom";

export const useFunctions = () => {
  const navigate = useNavigate();
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

  const handleAddCompanyClick = async () => {
    await addCompany(companyData);
    navigate("/admin/companies");
  };

  return {
    companyData,
    handleChange,
    handleAddCompanyClick,
  };
};
