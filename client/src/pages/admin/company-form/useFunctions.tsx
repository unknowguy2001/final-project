import { useForm } from "react-hook-form";
import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { CompanyData } from "../../../interfaces/company";
import * as companiesService from "../../../services/companiesService";

const useFunctions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId } = useParams();

  const { register, handleSubmit, formState, setValue } =
    useForm<CompanyData>();

  const parsedCompanyId = companyId ? parseInt(companyId) : null;
  const mode = location.pathname.includes("new") ? "new" : "edit";
  const isNewMode = mode === "new";

  const getCompany = useCallback(
    async (config: AxiosRequestConfig) => {
      if (!parsedCompanyId) return;
      const response = await companiesService.getCompany(
        parsedCompanyId,
        config
      );
      const {
        name,
        address,
        road,
        village,
        district,
        province,
        zipcode,
        telephone,
      } = response.data.item;
      setValue("name", name);
      setValue("address", address);
      setValue("road", road);
      setValue("village", village);
      setValue("district", district);
      setValue("province", province);
      setValue("zipcode", zipcode);
      setValue("telephone", telephone);
    },
    [parsedCompanyId, setValue]
  );

  useEffect(() => {
    const abortController = new AbortController();

    getCompany({
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, [getCompany]);

  const onSubmit = async (companyData: CompanyData) => {
    if (isNewMode) {
      await companiesService.addCompany(companyData);
    } else {
      if (!parsedCompanyId) return;
      await companiesService.updateCompany(parsedCompanyId, companyData);
    }
    navigate("/admin/companies");
  };

  return {
    isNewMode,
    register,
    handleSubmit,
    onSubmit,
    formState,
  };
};

export default useFunctions;
