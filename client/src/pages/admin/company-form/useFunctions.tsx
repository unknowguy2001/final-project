import { useForm } from "react-hook-form";
import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { CompanyData } from "../../../interfaces/company";
import * as companiesService from "../../../services/companiesService";

export const useFunctions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId } = useParams();

  const { register, handleSubmit, formState, setValue } =
    useForm<CompanyData>();

  const parsedCompanyId = companyId ? parseInt(companyId) : null;

  const isMode = useCallback(
    (mode: "new" | "edit") => location.pathname.includes(mode),
    [location.pathname]
  );

  const getCompany = useCallback(
    async (config: AxiosRequestConfig) => {
      const response = await companiesService.getCompany(
        parsedCompanyId!,
        config
      );

      if (!response.data.item) return navigate("/admin/companies");

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
    [parsedCompanyId, setValue, navigate]
  );

  const onSubmit = async (companyData: CompanyData) => {
    if (isMode("new")) {
      await companiesService.addCompany(companyData);
    } else {
      if (!parsedCompanyId) return;
      await companiesService.updateCompany(parsedCompanyId, companyData);
    }
    navigate("/admin/companies");
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (isMode("edit")) {
      getCompany({
        signal: abortController.signal,
      });
    }

    return () => abortController.abort();
  }, [getCompany, isMode]);

  return {
    isMode,
    register,
    handleSubmit,
    onSubmit,
    formState,
  };
};
